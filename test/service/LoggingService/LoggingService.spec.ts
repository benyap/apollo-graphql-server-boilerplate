import sinon from 'sinon';
import {
  LoggingService,
  ILoggingService,
  LogLevel,
  LogTopic,
  LoggingServiceConfiguration,
} from '../../../src/services/LoggingService';

describe('LoggingService', () => {
  describe('constructor', () => {
    it('sets using color correctly (true)', async () => {
      const loggingService = new LoggingService();
      await loggingService.init(
        {
          showLogLevels: [LogLevel.INFO],
          showLogTopics: [LogTopic.SERVER],
          timezone: 'Australia/Melbourne',
        },
        true,
      );
      expect(loggingService.usingColor()).toBe(true);
    });

    it('sets using color correctly (false)', async () => {
      const loggingService = new LoggingService();
      await loggingService.init({
        showLogLevels: [LogLevel.INFO],
        showLogTopics: [LogTopic.SERVER],
        timezone: 'Australia/Melbourne',
      });
      expect(loggingService.usingColor()).toBe(false);
    });
  });

  describe('LoggingService methods', () => {
    let loggingService: ILoggingService;
    const config: LoggingServiceConfiguration = {
      showLogLevels: [LogLevel.INFO],
      showLogTopics: [LogTopic.SERVER],
      timezone: 'Australia/Melbourne',
    };
    beforeEach(async () => {
      loggingService = new LoggingService();
      await loggingService.init(config);
    });

    it('adds an output to the logger', () => {
      const output = () => null;
      loggingService.addOutput('output', output);
      expect(loggingService.getOutputs()).toEqual({ output });
    });
    it('removes an output from the logger', () => {
      const output = () => null;
      loggingService.addOutput('output', output);
      expect(loggingService.getOutputs()).toEqual({ output });
      loggingService.removeOutput('output');
      expect(loggingService.getOutputs()).toEqual({});
    });

    describe('creating loggers', () => {
      it('throws an error when there is no output given yet', () => {
        const log = loggingService.createLogger(LogTopic.SERVER)(LogLevel.INFO);
        const test = () => log('hello');
        expect(test).toThrow(
          new Error('No output function given to logger yet.'),
        );
      });
      it('creates a logger for a valid level and topic', () => {
        const outputSpy = sinon.spy();
        loggingService.addOutput('output', outputSpy);
        const log = loggingService.createLogger(LogTopic.SERVER)(LogLevel.INFO);
        log('hello');
        expect(outputSpy.args[0][0]).toEqual(config);
        expect(outputSpy.args[0][1]).toEqual(LogTopic.SERVER);
        expect(outputSpy.args[0][2]).toEqual(LogLevel.INFO);
        expect(outputSpy.args[0][3]).toEqual('hello');
        expect(outputSpy.args[0][4]).toEqual(false);
      });
      it('creates a logger for a valid level and topic with colour', () => {
        const outputSpy = sinon.spy();
        loggingService.addOutput('output', outputSpy);
        const log = loggingService.createLogger(LogTopic.SERVER, true)(
          LogLevel.INFO,
        );
        log('hello');
        expect(outputSpy.args[0][0]).toEqual(config);
        expect(outputSpy.args[0][1]).toEqual(LogTopic.SERVER);
        expect(outputSpy.args[0][2]).toEqual(LogLevel.INFO);
        expect(outputSpy.args[0][3]).toEqual('hello');
        expect(outputSpy.args[0][4]).toEqual(true);
      });
      it('does not create a logger for an invalid level', () => {
        const outputSpy = sinon.spy();
        loggingService.addOutput('output', outputSpy);
        const log = loggingService.createLogger(LogTopic.SERVER)(
          LogLevel.DEBUG,
        );
        log('hello');
        expect(outputSpy.notCalled).toBe(true);
      });
      it('creates a logger for an invalid topic', () => {
        const outputSpy = sinon.spy();
        loggingService.addOutput('output', outputSpy);
        const log = loggingService.createLogger(LogTopic.ENVIRONMENT)(
          LogLevel.INFO,
        );
        log('hello');
        expect(outputSpy.notCalled).toBe(true);
      });
    });
  });
});
