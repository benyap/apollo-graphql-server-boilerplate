import chalk from 'chalk';

import { LogLevel, LogTopic } from './enums';

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
    case LogLevel.SILLY:         return chalk.dim(message);
    case LogLevel.DEBUG:         return chalk.gray(message);
    case LogLevel.INFO:          return message.replace(/\[info\]/, chalk.blue('[info]'));
    case LogLevel.WARN:          return chalk.yellow(message);
    case LogLevel.ERROR:         return chalk.red(message);
    case LogLevel.FATAL:         return chalk.bgRed.white(message);

    // Log topics
    case LogTopic.SERVER:          return chalk.inverse.white(message);
    case LogTopic.ENVIRONMENT:     return chalk.inverse.gray(message);
    case LogTopic.NETWORK:         return chalk.inverse.blue(message);
    case LogTopic.SERVICE:
    case LogTopic.CONTEXTCREATOR:  return chalk.inverse.gray(message);
    case LogTopic.AUTHENTICATION:  return chalk.inverse.red(message);
    case LogTopic.GRAPHQLCOST:     return chalk.inverse.magenta(message);

    default:                      return message;
  }
};

export const wrapLevelTag = (tag: LogLevel, useColor: boolean) =>
  colorize(useColor, tag)(wrapTag(5)(tag));

export const wrapTopicTag = (tag: LogTopic, useColor: boolean) =>
  colorize(useColor, tag)(wrapTag(4)(tag));

export { colorize };
