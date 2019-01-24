import { ELogTopic, ELogLevel } from '.';
import { IService } from '../service/types';

export interface LoggingServiceConfiguration {
  /**
   * The timezone in which to use for log messages.
   * See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
   */
  timezone: string;
  /**
   * Whitelist of topics to output to the logger.
   */
  showLogTopics: ELogTopic[];
  /**
   * Whitelise of levels to output to the logger.
   */
  showLogLevels: ELogLevel[];
}

/**
 * A custom defined function that can handle logger output.
 */
export type FLoggerCustomOutputFunction = (
  config: LoggingServiceConfiguration,
  topic: ELogTopic,
  level: ELogLevel,
  msg: string | object,
  useColor?: boolean,
) => void;

/**
 * Logging output function.
 */
export type FLoggerOuptutFunction = (msg: string | object) => void;

/**
 * Logging output function that accepts a log level.
 */
export type FLoggerLevelOutputFunction = (
  level: ELogLevel,
) => FLoggerOuptutFunction;

export interface ILoggingService extends IService<LoggingServiceConfiguration> {
  /**
   * Add a function that will accept the output from the logger.
   * @param name name of the output function
   * @param output output function
   */
  addOutput(name: string, output: FLoggerCustomOutputFunction);

  /**
   * Remove an output function from the logger.
   * @param name
   */
  removeOutput(name: string);

  /**
   * Create a logger that outputs to the specified logger topic.
   * @param topic the logger topic
   */
  createLogger(topic: ELogTopic): FLoggerLevelOutputFunction;
}
