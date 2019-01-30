import sinon from 'sinon';
import { createDefaultLogger } from '../../../src/services/LoggingService/loggers';
import {
  LogTopic,
  LogLevel,
  LoggingServiceConfiguration,
} from '../../../src/services/LoggingService';

describe('Service: creating pre-configured loggers', () => {
  it('creates a default logger with no colour and prints a string', () => {
    const logger = createDefaultLogger();
    const consoleStub = sinon.stub(console, 'log');
    const loggerConfig: LoggingServiceConfiguration = {
      timezone: 'Australia/Melbourne',
      showLogLevels: [LogLevel.INFO],
      showLogTopics: [LogTopic.SERVER],
    };
    logger(loggerConfig, LogTopic.SERVER, LogLevel.INFO, 'message');
    expect(consoleStub.called);
    expect(consoleStub.args[0][0]).toMatch(/.* \[main\] \[info\] {2}message/);
    consoleStub.restore();
  });
  it('creates a default logger with no colour and prints an object', () => {
    const logger = createDefaultLogger();
    const consoleStub = sinon.stub(console, 'log');
    const loggerConfig: LoggingServiceConfiguration = {
      timezone: 'Australia/Melbourne',
      showLogLevels: [LogLevel.INFO],
      showLogTopics: [LogTopic.SERVER],
    };
    logger(loggerConfig, LogTopic.SERVER, LogLevel.INFO, { hello: 'world' });
    expect(consoleStub.called);
    expect(consoleStub.args[0][0]).toMatch(/"hello": "world"/);
    consoleStub.restore();
  });
  it('creates a default logger with colour and prints a string', () => {
    const logger = createDefaultLogger();
    const consoleStub = sinon.stub(console, 'log');
    const loggerConfig: LoggingServiceConfiguration = {
      timezone: 'Australia/Melbourne',
      showLogLevels: [LogLevel.INFO],
      showLogTopics: [LogTopic.SERVER],
    };
    logger(loggerConfig, LogTopic.SERVER, LogLevel.INFO, 'message', true);
    expect(consoleStub.called);
    // FIXME: find a way to match the output
    consoleStub.restore();
  });
  it('creates a default logger with colour and prints an object', () => {
    const logger = createDefaultLogger();
    const consoleStub = sinon.stub(console, 'log');
    const loggerConfig: LoggingServiceConfiguration = {
      timezone: 'Australia/Melbourne',
      showLogLevels: [LogLevel.INFO],
      showLogTopics: [LogTopic.SERVER],
    };
    logger(
      loggerConfig,
      LogTopic.SERVER,
      LogLevel.INFO,
      { hello: 'world' },
      true,
    );
    expect(consoleStub.called);
    // FIXME: find a way to match the output
    consoleStub.restore();
  });
});
