import {
  LogTopic,
  LogLevel,
  LoggingServiceConfiguration,
} from '../services/LoggingService';

const loggerConfig: LoggingServiceConfiguration = {
  timezone: 'Australia/Melbourne',
  showLogLevels: [
    LogLevel.SILLY,
    LogLevel.DEBUG,
    LogLevel.INFO,
    LogLevel.WARN,
    LogLevel.ERROR,
    LogLevel.FATAL,
  ],
  showLogTopics: [
    LogTopic.SERVER,
    LogTopic.ENVIRONMENT,
    LogTopic.SERVICE,
    LogTopic.NETWORK,
    LogTopic.AUTHENTICATION,
    LogTopic.CONTEXTCREATOR,
    LogTopic.GRAPHQLCOST,
  ],
};

export default loggerConfig;
