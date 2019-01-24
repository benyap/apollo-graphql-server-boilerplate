import { EServiceName } from '../service/enums';
import { AbstractService } from '../service/AbstractService';

import {
  ILoggingService,
  LoggingServiceConfiguration,
  FLoggerCustomOutputFunction,
} from './types';
import { ELogTopic, ELogLevel } from './enums';

export class LoggingService extends AbstractService<LoggingServiceConfiguration>
  implements ILoggingService {
  private useColor: boolean;
  private config: LoggingServiceConfiguration;
  private outputs: { [key: string]: FLoggerCustomOutputFunction } = {};

  constructor() {
    super(EServiceName.LoggingService, 'GenericLoggingService');
  }

  public static readonly void = () => () => null;

  public async init(
    config: LoggingServiceConfiguration,
    useColor: boolean = false,
  ) {
    this.config = config;
    this.useColor = useColor;
  }

  public usingColor = () => this.useColor;

  public addOutput(name: string, output: FLoggerCustomOutputFunction) {
    this.outputs[name] = output;
  }

  public removeOutput(name: string) {
    delete this.outputs[name];
  }

  public getOutputs() {
    return { ...this.outputs };
  }

  public createLogger(topic: ELogTopic, useColor: boolean = this.useColor) {
    return (level: ELogLevel) => {
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
            (output as FLoggerCustomOutputFunction)(
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
}
