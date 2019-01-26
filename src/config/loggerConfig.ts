import {
  ELogTopic,
  ELogLevel,
  LoggingServiceConfiguration,
} from '../services/LoggingService';

const loggerConfig: LoggingServiceConfiguration = {
  timezone: 'Australia/Melbourne',
  showLogLevels: [
    ELogLevel.SILLY,
    ELogLevel.DEBUG,
    ELogLevel.INFO,
    ELogLevel.WARN,
    ELogLevel.ERROR,
    ELogLevel.FATAL,
  ],
  showLogTopics: [
    ELogTopic.SERVICE,
    ELogTopic.SERVER,
    ELogTopic.ENVIRONMENT,
    ELogTopic.NETWORK,
  ],
};

export default loggerConfig;
