import chalk from 'chalk';

import { ELogLevel, ELogTopic } from './enums';

/**
 * This function wraps a Logger level/topic name in square brackets,
 * adding spaces for padding so that all tags of consistent width.
 * @param width the maximum width of the tag to wrap.
 */
const wrapTag = (width: number) => (tag: string) => {
  let padding = '';
  for (let i = 0; i < width - tag.length; i++) {
    padding += ' ';
  }
  return `[${tag}]${padding}`;
};

/**
 * This function will colorise the message if `useColor` is true.
 */
const colorize = (useColor: boolean, tag: string) => (message: string) => {
  if (!useColor) return message;
  // prettier-ignore
  switch (tag) {
    // Log levels
    case ELogLevel.SILLY:         return chalk.dim(message);
    case ELogLevel.DEBUG:         return chalk.gray(message);
    case ELogLevel.INFO:          return message.replace(/\[info\]/, chalk.blue('[info]'));
    case ELogLevel.WARN:          return chalk.yellow(message);
    case ELogLevel.ERROR:         return chalk.red(message);
    case ELogLevel.FATAL:         return chalk.bgRed.white(message);

    // Log topics
    case ELogTopic.SERVER:        return chalk.inverse.white(message);
    case ELogTopic.ENVIRONMENT:   return chalk.inverse.gray(message);
    case ELogTopic.NETWORK:       return chalk.inverse.blue(message);
    case ELogTopic.SERVICE:       return chalk.inverse.gray(message);

    default:                      return message;
  }
};

export const wrapLevelTag = (tag: string, useColor: boolean) =>
  colorize(useColor, tag)(wrapTag(5)(tag));

export const wrapTopicTag = (tag: string, useColor: boolean) =>
  colorize(useColor, tag)(wrapTag(4)(tag));

export { colorize };
