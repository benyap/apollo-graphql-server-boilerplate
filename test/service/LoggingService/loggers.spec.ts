import sinon from 'sinon';
import { createDefaultLogger } from '../../../src/services/LoggingService/loggers';
import {
  ELogTopic,
  ELogLevel,
  LoggingServiceConfiguration,
} from '../../../src/services/LoggingService';

describe('creating pre-configured loggers', () => {
  it('creates a default logger with no colour and prints a string', () => {
    const logger = createDefaultLogger();
    const consoleStub = sinon.stub(console, 'log');
    const loggerConfig: LoggingServiceConfiguration = {
      timezone: 'Australia/Melbourne',
      showLogLevels: [ELogLevel.INFO],
      showLogTopics: [ELogTopic.SERVER],
    };
    logger(loggerConfig, ELogTopic.SERVER, ELogLevel.INFO, 'message');
    expect(consoleStub.called);
    expect(consoleStub.args[0][0]).toMatch(/.* \[main\] \[info\] {2}message/);
    consoleStub.restore();
  });
  it('creates a default logger with no colour and prints an object', () => {
    const logger = createDefaultLogger();
    const consoleStub = sinon.stub(console, 'log');
    const loggerConfig: LoggingServiceConfiguration = {
      timezone: 'Australia/Melbourne',
      showLogLevels: [ELogLevel.INFO],
      showLogTopics: [ELogTopic.SERVER],
    };
    logger(loggerConfig, ELogTopic.SERVER, ELogLevel.INFO, { hello: 'world' });
    expect(consoleStub.called);
    expect(consoleStub.args[0][0]).toMatch(/"hello": "world"/);
    consoleStub.restore();
  });
  it('creates a default logger with colour and prints a string', () => {
    const logger = createDefaultLogger();
    const consoleStub = sinon.stub(console, 'log');
    const loggerConfig: LoggingServiceConfiguration = {
      timezone: 'Australia/Melbourne',
      showLogLevels: [ELogLevel.INFO],
      showLogTopics: [ELogTopic.SERVER],
    };
    logger(loggerConfig, ELogTopic.SERVER, ELogLevel.INFO, 'message', true);
    expect(consoleStub.called);
    // FIXME: find a way to match the output
    consoleStub.restore();
  });
  it('creates a default logger with colour and prints an object', () => {
    const logger = createDefaultLogger();
    const consoleStub = sinon.stub(console, 'log');
    const loggerConfig: LoggingServiceConfiguration = {
      timezone: 'Australia/Melbourne',
      showLogLevels: [ELogLevel.INFO],
      showLogTopics: [ELogTopic.SERVER],
    };
    logger(
      loggerConfig,
      ELogTopic.SERVER,
      ELogLevel.INFO,
      { hello: 'world' },
      true,
    );
    expect(consoleStub.called);
    // FIXME: find a way to match the output
    consoleStub.restore();
  });
});
