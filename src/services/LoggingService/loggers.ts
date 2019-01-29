import moment from 'moment-timezone';

import { LogTopic, LogLevel } from './enums';
import { wrapLevelTag, wrapTopicTag, colorize } from './utils';
import { LoggerCustomOutputFn, LoggingServiceConfiguration } from './types';

const createDefaultLogger: () => LoggerCustomOutputFn = () => (
  config: LoggingServiceConfiguration,
  topic: LogTopic,
  level: LogLevel,
  msg: string | object,
  useColor = false,
) => {
  const preambleString =
    `${moment()
      .tz(config.timezone)
      .format('YYYY-MMM-DD HH:mm:ss.SSS Z')} ` +
    `${wrapTopicTag(topic, useColor)} ${wrapLevelTag(level, useColor)}`;

  const messageString =
    // JSON.stringify any objects
    (typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg)
      // Split by any new lines
      .split(/\n/g)
      // Color each new line
      .map(message => colorize(useColor, level)(message))
      // Add preamble to each new line and join together
      .join(`\n${preambleString} `);

  // tslint:disable-next-line
  console.log(`${preambleString} ${messageString}`);
};

export { createDefaultLogger };
