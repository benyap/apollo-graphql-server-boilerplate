import { LoggerLevelOutputFn } from '../LoggingService/types';
import { ELogLevel } from '../LoggingService';

export const logAndThrow = (log: LoggerLevelOutputFn, error) => {
  log(ELogLevel.ERROR)(error.message);
  throw error;
};
