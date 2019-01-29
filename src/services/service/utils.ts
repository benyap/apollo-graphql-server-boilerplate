import { LoggerLevelOutputFn } from '../LoggingService/types';
import { LogLevel } from '../LoggingService';

export const logAndThrow = (log: LoggerLevelOutputFn, error) => {
  log(LogLevel.ERROR)(error.message);
  throw error;
};
