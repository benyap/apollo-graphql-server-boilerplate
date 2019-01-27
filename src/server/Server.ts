import fs from 'fs';
import https from 'https';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import enforce from 'express-sslify';

import configureEnvironment from '../environment/configureEnvironment';

import { ServerConfiguration } from './types';
import createLoggingService, {
  LoggerLevelOutputFn,
  LoggingService,
  ELogLevel,
  createDefaultLogger,
  ELogTopic,
} from '../services/LoggingService';

import ServiceLibrary, { IServiceLibrary } from '../services/ServiceLibrary';
import initialiseBasicServices from './basicServices';

export class Server {
  private config: ServerConfiguration;
  private log: LoggerLevelOutputFn;
  private serviceLibrary: IServiceLibrary;

  private server;
  private portConfig: { port: number };
  private useSSL: boolean;

  constructor(config: ServerConfiguration) {
    this.config = config;
    this.log = LoggingService.void;
  }

  /**
   * Initialise all services for the server.
   */
  public async initialiseServices() {
    // Configure environment
    await configureEnvironment();

    // Initialise logging service
    const LOCAL = process.env.NODE_ENV === 'local';
    const loggingService = await createLoggingService(
      this.config.logger,
      LOCAL,
    );
    loggingService.addOutput('console', createDefaultLogger());
    this.log = loggingService.createLogger(ELogTopic.SERVER);

    // Initialise service library
    const serviceLibrary = new ServiceLibrary();
    await serviceLibrary.init({
      log: loggingService.createLogger(ELogTopic.SERVICE),
    });
    this.serviceLibrary = serviceLibrary;

    // Initialise services
    this.log(ELogLevel.SILLY)(`Initalising services...`);
    await initialiseBasicServices(
      this.config,
      loggingService,
      this.serviceLibrary,
    );

    // TODO: add more services to be initialised here

    this.log(ELogLevel.DEBUG)(`Services initialised.`);
  }

  /**
   * Configure the server with services and settings so that it is ready to start.
   */
  public async configureServer() {
    this.log(ELogLevel.SILLY)(`Configuring server...`);
    const CERT_NAME = 'localhost';
    const PRODUCTION = process.env.NODE_ENV === 'production';
    const LOCAL = process.env.NODE_ENV === 'local';

    // =======================
    //  Express configuration
    // =======================

    // Create Express app
    const app = express();

    // Set default port
    this.portConfig = { port: parseInt(process.env.PORT, 10) || 4000 };

    // List of CORS allowed origins
    const subdomainsRegexPartial = this.config.subdomains
      .map(s => `${s}\.`)
      .join('|');

    const allowedOrigins = [
      // This allows the root domain and all subdomains with AND without `dev` and `qat` prefixes.
      new RegExp(
        `https:\/\/(dev\.|qat\.){0,1}(${subdomainsRegexPartial}){0,1}${
          process.env.DOMAIN_REGEX
        }`,
      ),
    ];

    // Allow localhost on non-production environments
    if (!PRODUCTION) allowedOrigins.push(/https?:\/\/localhost\:[0-9]{4}/);

    // Set `trustProtoHeader` for Heroku. See https://www.npmjs.com/package/express-sslify
    if (!LOCAL) app.use(enforce.HTTPS({ trustProtoHeader: true }));

    // Configure Express app
    app.use(cors({ origin: allowedOrigins }));
    app.disable('x-powered-by');
    app.use(compression());
    app.use(
      morgan(
        ':method :url HTTP/:http-version - :status :response-time ms :res[content-length]',
        {
          stream: {
            write: msg => this.log(ELogLevel.DEBUG)(msg.replace('\n', '')),
          },
        },
      ),
    );

    // Serve static files from public folder
    app.use(express.static('public'));

    // Configure SSL if available on localhost
    if (
      LOCAL &&
      fs.existsSync(`./certs/${CERT_NAME}.crt`) &&
      fs.existsSync(`./certs/${CERT_NAME}.key`)
    ) {
      this.server = https.createServer(
        {
          key: fs.readFileSync(`./certs/${CERT_NAME}.key`),
          cert: fs.readFileSync(`./certs/${CERT_NAME}.crt`),
        },
        app,
      );
      this.useSSL = true;
      this.portConfig = { port: 443 };
      this.log(ELogLevel.SILLY)(`Local server configured with custom SSL.`);
    } else {
      this.server = app;
    }
  }

  /**
   * Start the server.
   * Remember to use `initaliseServices()` and `configureServer()` first.
   */
  public start() {
    const LOCAL = process.env.NODE_ENV === 'local';

    this.server.listen(this.portConfig, () => {
      this.log(ELogLevel.INFO)(
        `SERVER READY in ${process.env.NODE_ENV.toUpperCase()} environment (port=${
          this.portConfig.port
        })`,
      );
      if (LOCAL) {
        if (this.useSSL) {
          this.log(ELogLevel.DEBUG)(`SERVER READY at https://localhost`);
        } else {
          this.log(ELogLevel.DEBUG)(
            `SERVER READY at http://localhost:${this.portConfig.port}`,
          );
          this.log(ELogLevel.DEBUG)(
            `WARNING: Configure a HTTPS server for secure connections.`,
          );
        }
      }
    });
  }
}
