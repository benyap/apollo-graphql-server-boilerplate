import fs from 'fs';
import dotenv from 'dotenv';
import { ELogLevel, LoggingService } from '../services/LoggingService';
import { FLoggerLevelOutputFunction } from '../services/LoggingService/types';

/**
 * Configure environment variables using a local .env file.
 */
const configureLocal = (log: FLoggerLevelOutputFunction) => {
  // A .env file should exist with environment variables.
  log(ELogLevel.DEBUG)('Using local .env');
  dotenv.config();
};

/**
 * Configure environment variables when on a non-local environment.
 */
const configureNonLocal = (log: FLoggerLevelOutputFunction) => {
  // EnvVars should be loaded automatically by environment.
  log(ELogLevel.DEBUG)('Environment variables expected to be loaded.');
};

/**
 * Complete configuration of environment variables.
 */
const completeConfiguration = (log: FLoggerLevelOutputFunction) => {
  // TODO: any parsing of environment variables should be done here.
  process.env.DOMAIN_REGEX = process.env.DOMAIN.replace(/\./g, '\\\\.');

  // Done
  log(ELogLevel.INFO)(`Loaded environment configuration successfully.`);
};

/**
 * Configure environment variables based on environment.
 */
const configureEnvironment = async (
  log: FLoggerLevelOutputFunction = LoggingService.void,
) => {
  log(ELogLevel.DEBUG)('Configuring environment variables...');
  if (fs.existsSync('.env')) configureLocal(log);
  else configureNonLocal(log);
  completeConfiguration(log);
};

export default configureEnvironment;
