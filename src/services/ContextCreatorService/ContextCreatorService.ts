import { AbstractService } from '../service/AbstractService';
import { EServiceName } from '../service/enums';
import { ServerEnvironment } from '../service/types';
import { ServerConfiguration } from '../../server/types';

import { LoggingService, ELogLevel } from '../LoggingService';
import { IAuthenticationService } from '../AuthenticationService';
import ServiceLibrary, { IServiceLibrary } from '../ServiceLibrary';

import {
  ContextCreatorServiceConfiguration,
  IContextCreatorService,
  GraphQLContext,
} from './types';

export class ContextCreatorService
  extends AbstractService<ContextCreatorServiceConfiguration>
  implements IContextCreatorService {
  private serverConfig: ServerConfiguration;
  private authenticationService: IAuthenticationService;
  private serviceLibrary: IServiceLibrary;

  constructor() {
    super(EServiceName.ContextCreatorService, 'ContextCreatorService');
  }

  public async init(config: ContextCreatorServiceConfiguration) {
    this.serverConfig = config.serverConfig;
    this.authenticationService = config.authenticationService;
    this.serviceLibrary = config.serviceLibrary;
    this.log = config.log || LoggingService.void;
    this.log(ELogLevel.DEBUG)('Context creator service initialised.');
  }

  /**
   * This method will determine what information will be made available
   * to the resolvers through the context by examining the requested actions
   * and any provided authorization tokens.
   *
   * FIXME: This method needs a custom implementation.
   *
   * @param header the authorization header
   * @param actions the requested actions
   */
  public async createContext(header: string = '', actions: string[] = []) {
    try {
      // Authenticate token
      const token = header.replace('Bearer ', '');
      const authenticationResult = await this.authenticationService.authenticate(
        token,
      );

      // Check if user is authenticated to perform the requested action
      // FIXME: implement permission checking logic
      this.log(ELogLevel.WARN)(`Permission checking logic not implemented`);

      // Injext permitted services into the context
      // FIXME: implement service injection logic
      const serviceLibrary = new ServiceLibrary();
      await serviceLibrary.init({});
      this.log(ELogLevel.WARN)(`Service injection logic not implemented`);

      // Construct context
      const context: GraphQLContext = {
        ...authenticationResult,
        serviceLibrary,
        // TODO: implement data loaders
        dataLoaders: {},
        diagnostics: {
          environment: process.env.NODE_ENV as ServerEnvironment,
          version: this.serverConfig.version,
          startDate: this.serverConfig.startDate,
        },
      };
      return context;
    } catch (error) {
      this.log(ELogLevel.ERROR)(error);
    }
  }
}
