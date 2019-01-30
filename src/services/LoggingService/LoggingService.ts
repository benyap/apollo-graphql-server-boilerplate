import { EServiceName } from '../service/enums';
import { AbstractService } from '../service/AbstractService';

import {
  ILoggingService,
  LoggingServiceConfiguration,
  LoggerCustomOutputFn,
} from './types';
import { LogTopic, LogLevel } from './enums';

export class LoggingService extends AbstractService<LoggingServiceConfiguration>
  implements ILoggingService {
  private useColor: boolean;
  private config: LoggingServiceConfiguration;
  private outputs: { [key: string]: LoggerCustomOutputFn } = {};

  constructor() {
    super(EServiceName.LoggingService, 'GenericLoggingService');
  }

  public static readonly void = () => () => null;

  public init = async (
    config: LoggingServiceConfiguration,
    useColor: boolean = false,
  ) => {
    this.config = config;
    this.useColor = useColor;
  };

  public usingColor = () => this.useColor;

  public addOutput = (name: string, output: LoggerCustomOutputFn) => {
    this.outputs[name] = output;
  };

  public removeOutput = (name: string) => {
    delete this.outputs[name];
  };

  public getOutputs = () => ({ ...this.outputs });

  public createLogger = (
    topic: LogTopic,
    useColor: boolean = this.useColor,
  ) => (level: LogLevel) => {
    // Only log messages if topic needs to be shown.
    if (
      new Set(this.config.showLogTopics).has(topic) &&
      new Set(this.config.showLogLevels).has(level)
    ) {
      return message => {
        // Send log message to output functions
        if (!Object.keys(this.outputs).length) {
          throw new Error('No output function given to logger yet.');
        }
        // Send log messages to all outputs
        for (const output of (Object as any).values(this.outputs)) {
          (output as LoggerCustomOutputFn)(
            this.config,
            topic,
            level,
            message,
            useColor,
          );
        }
      };
    }
    // Otherwise, just return an empty function.
    else return () => null;
  };
}
