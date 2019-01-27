import { LoggingService } from './LoggingService';
import { ELogTopic, ELogLevel } from './enums';
import {
  ILoggingService,
  LoggingServiceConfiguration,
  LoggerLevelOutputFn,
} from './types';

async function createLoggingService(
  config: LoggingServiceConfiguration,
  useColor: boolean = false,
) {
  const logger = new LoggingService();
  await logger.init(config, useColor);
  return logger as ILoggingService;
}

export default createLoggingService;

export { createDefaultLogger } from './loggers';
export {
  ILoggingService,
  LoggingServiceConfiguration,
  LoggerLevelOutputFn,
  ELogLevel,
  ELogTopic,
  LoggingService,
};
