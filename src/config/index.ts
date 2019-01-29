import { ServerConfiguration } from '../server/types';
import loggerConfig from './loggerConfig';

const config: ServerConfiguration = {
  version: 'v0.0.1',
  startDate: new Date(),
  subdomains: [],
  logger: loggerConfig,
};

export default config;
