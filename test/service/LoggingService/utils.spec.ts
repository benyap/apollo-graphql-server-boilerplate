import * as utils from '../../../src/services/LoggingService/utils';
import { LogLevel, LogTopic } from '../../../src/services/LoggingService/enums';
import chalk from 'chalk';

describe('LoggingService utils', () => {
  describe('colorize()', () => {
    it('does not colorize message when useColor=false', () => {
      expect(utils.colorize(false, null)('message')).toEqual('message');
    });

    describe('colorize levels', () => {
      let testLevel;
      beforeEach(() => {
        testLevel = (level: LogLevel) =>
          utils.colorize(true, level)('[info] message');
      });
      it('returns no colour for unrecognised level', () => {
        expect(testLevel(null)).toEqual('[info] message');
      });
      it('returns the proper color for LogLevel.SILLY', () => {
        expect(testLevel(LogLevel.SILLY)).toEqual(chalk.dim('[info] message'));
      });
      it('returns the proper color for LogLevel.DEBUG', () => {
        expect(testLevel(LogLevel.DEBUG)).toEqual(chalk.gray('[info] message'));
      });
      it('returns the proper color for LogLevel.INFO', () => {
        expect(testLevel(LogLevel.INFO)).toEqual(
          chalk.blue('[info]') + ' message',
        );
      });
      it('returns the proper color for LogLevel.WARN', () => {
        expect(testLevel(LogLevel.WARN)).toEqual(
          chalk.yellow('[info] message'),
        );
      });
      it('returns the proper color for LogLevel.ERROR', () => {
        expect(testLevel(LogLevel.ERROR)).toEqual(chalk.red('[info] message'));
      });
      it('returns the proper color for LogLevel.FATAL', () => {
        expect(testLevel(LogLevel.FATAL)).toEqual(
          chalk.bgRed.white('[info] message'),
        );
      });
    });

    describe('colorize topics', () => {
      let testLevel;
      beforeEach(() => {
        testLevel = (level: LogTopic) => utils.colorize(true, level)('message');
      });
      it('returns the proper color for LogTopic.SERVER', () => {
        expect(testLevel(LogTopic.SERVER)).toEqual(
          chalk.inverse.white('message'),
        );
      });
      it('returns the proper color for LogTopic.ENVIRONMENT', () => {
        expect(testLevel(LogTopic.ENVIRONMENT)).toEqual(
          chalk.inverse.gray('message'),
        );
      });
      it('returns the proper color for LogTopic.NETWORK', () => {
        expect(testLevel(LogTopic.NETWORK)).toEqual(
          chalk.inverse.blue('message'),
        );
      });
      it('returns the proper color for LogTopic.SERVICE', () => {
        expect(testLevel(LogTopic.SERVICE)).toEqual(
          chalk.inverse.gray('message'),
        );
      });
      it('returns the proper color for LogTopic.CONTEXTCREATOR', () => {
        expect(testLevel(LogTopic.CONTEXTCREATOR)).toEqual(
          chalk.inverse.gray('message'),
        );
      });
      it('returns the proper color for LogTopic.AUTHENTICATION', () => {
        expect(testLevel(LogTopic.AUTHENTICATION)).toEqual(
          chalk.inverse.red('message'),
        );
      });
      it('returns the proper color for LogTopic.GRAPHQLCOST', () => {
        expect(testLevel(LogTopic.GRAPHQLCOST)).toEqual(
          chalk.inverse.magenta('message'),
        );
      });
    });
  });

  describe('wrapLevelTag', () => {
    it('wraps a full length level tag with colour', () => {
      const output = utils.wrapLevelTag(LogLevel.SILLY, true);
      expect(output).toEqual(chalk.dim(`[silly]`));
    });
    it('wraps a short length level tag with colour', () => {
      const output = utils.wrapLevelTag(LogLevel.INFO, true);
      expect(output).toEqual(chalk.blue('[info]') + ' ');
    });
    it('wraps a full length level tag without colour', () => {
      const output = utils.wrapLevelTag(LogLevel.SILLY, false);
      expect(output).toEqual('[silly]');
    });
    it('wraps a short length level tag without colour', () => {
      const output = utils.wrapLevelTag(LogLevel.INFO, false);
      expect(output).toEqual('[info] ');
    });
  });

  describe('wrapTopicTag', () => {
    it('wraps a full length topic tag with colour', () => {
      const output = utils.wrapTopicTag(LogTopic.SERVER, true);
      expect(output).toEqual(chalk.inverse.white(`[main]`));
    });
    it('wraps a short length topic tag with colour', () => {
      const output = utils.wrapTopicTag(LogTopic.ENVIRONMENT, true);
      expect(output).toEqual(chalk.inverse.gray('[env] '));
    });
    it('wraps a full length topic tag without colour', () => {
      const output = utils.wrapTopicTag(LogTopic.SERVER, false);
      expect(output).toEqual('[main]');
    });
    it('wraps a short length topic tag without colour', () => {
      const output = utils.wrapTopicTag(LogTopic.ENVIRONMENT, false);
      expect(output).toEqual('[env] ');
    });
  });
});
