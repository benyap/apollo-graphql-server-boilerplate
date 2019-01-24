import { FLoggerLevelOutputFunction } from '../LoggingService/types';
import { ELogLevel } from '../LoggingService';

export const logAndThrow = (log: FLoggerLevelOutputFunction, error) => {
  log(ELogLevel.ERROR)(error.message);
  throw error;
};
