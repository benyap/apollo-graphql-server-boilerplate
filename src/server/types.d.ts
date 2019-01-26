import { LoggingServiceConfiguration } from '../services/LoggingService';

export interface ServerConfiguration {
  version: string;
  startDate: Date;
  subdomains: string[];
  logger: LoggingServiceConfiguration;
}
