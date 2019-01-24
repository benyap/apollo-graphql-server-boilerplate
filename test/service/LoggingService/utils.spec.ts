import * as utils from '../../../src/services/LoggingService/utils';
import {
  ELogLevel,
  ELogTopic,
} from '../../../src/services/LoggingService/enums';
import chalk from 'chalk';

describe('LoggingService utils', () => {
  describe('colorize()', () => {
    it('does not colorize message when useColor=false', () => {
      expect(utils.colorize(false, null)('message')).toEqual('message');
    });

    describe('colorize levels', () => {
      let testLevel;
      beforeEach(() => {
        testLevel = (level: ELogLevel) =>
          utils.colorize(true, level)('[info] message');
      });
      it('returns no colour for unrecognised level', () => {
        expect(testLevel(null)).toEqual('[info] message');
      });
      it('returns the proper color for ELogLevel.SILLY', () => {
        expect(testLevel(ELogLevel.SILLY)).toEqual(chalk.dim('[info] message'));
      });
      it('returns the proper color for ELogLevel.DEBUG', () => {
        expect(testLevel(ELogLevel.DEBUG)).toEqual(
          chalk.gray('[info] message'),
        );
      });
      it('returns the proper color for ELogLevel.INFO', () => {
        expect(testLevel(ELogLevel.INFO)).toEqual(
          chalk.blue('[info]') + ' message',
        );
      });
      it('returns the proper color for ELogLevel.WARN', () => {
        expect(testLevel(ELogLevel.WARN)).toEqual(
          chalk.yellow('[info] message'),
        );
      });
      it('returns the proper color for ELogLevel.ERROR', () => {
        expect(testLevel(ELogLevel.ERROR)).toEqual(chalk.red('[info] message'));
      });
      it('returns the proper color for ELogLevel.FATAL', () => {
        expect(testLevel(ELogLevel.FATAL)).toEqual(
          chalk.bgRed.white('[info] message'),
        );
      });
    });

    describe('colorize topics', () => {
      let testLevel;
      beforeEach(() => {
        testLevel = (level: ELogTopic) =>
          utils.colorize(true, level)('message');
      });
      it('returns the proper color for ELogTopic.SERVER', () => {
        expect(testLevel(ELogTopic.SERVER)).toEqual(
          chalk.inverse.white('message'),
        );
      });
      it('returns the proper color for ELogTopic.ENVIRONMENT', () => {
        expect(testLevel(ELogTopic.ENVIRONMENT)).toEqual(
          chalk.inverse.gray('message'),
        );
      });
      it('returns the proper color for ELogTopic.NETWORK', () => {
        expect(testLevel(ELogTopic.NETWORK)).toEqual(
          chalk.inverse.blue('message'),
        );
      });
      it('returns the proper color for ELogTopic.SERVICE', () => {
        expect(testLevel(ELogTopic.SERVICE)).toEqual(
          chalk.inverse.gray('message'),
        );
      });
    });
  });

  describe('wrapLevelTag', () => {
    it('wraps a full length level tag with colour', () => {
      const output = utils.wrapLevelTag(ELogLevel.SILLY, true);
      expect(output).toEqual(chalk.dim(`[silly]`));
    });
    it('wraps a short length level tag with colour', () => {
      const output = utils.wrapLevelTag(ELogLevel.INFO, true);
      expect(output).toEqual(chalk.blue('[info]') + ' ');
    });
    it('wraps a full length level tag without colour', () => {
      const output = utils.wrapLevelTag(ELogLevel.SILLY, false);
      expect(output).toEqual('[silly]');
    });
    it('wraps a short length level tag without colour', () => {
      const output = utils.wrapLevelTag(ELogLevel.INFO, false);
      expect(output).toEqual('[info] ');
    });
  });

  describe('wrapTopicTag', () => {
    it('wraps a full length topic tag with colour', () => {
      const output = utils.wrapTopicTag(ELogTopic.SERVER, true);
      expect(output).toEqual(chalk.inverse.white(`[main]`));
    });
    it('wraps a short length topic tag with colour', () => {
      const output = utils.wrapTopicTag(ELogTopic.ENVIRONMENT, true);
      expect(output).toEqual(chalk.inverse.gray('[env] '));
    });
    it('wraps a full length topic tag without colour', () => {
      const output = utils.wrapTopicTag(ELogTopic.SERVER, false);
      expect(output).toEqual('[main]');
    });
    it('wraps a short length topic tag without colour', () => {
      const output = utils.wrapTopicTag(ELogTopic.ENVIRONMENT, false);
      expect(output).toEqual('[env] ');
    });
  });
});
