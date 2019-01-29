import { IService } from './types';
import { EServiceName } from './enums';
import { LoggerLevelOutputFn } from '../LoggingService';

export abstract class AbstractService<T> implements IService<T> {
  public static GET_LIMIT = 100;

  protected serviceName: EServiceName;
  protected implementationName: string;
  protected log: LoggerLevelOutputFn;

  constructor(serviceName: EServiceName, implementationName: string) {
    this.serviceName = serviceName;
    this.implementationName = implementationName;
    this.log = () => () => null;
  }

  public getServiceName = () => this.serviceName;

  public getImplementationName = () => this.implementationName;

  public abstract init(config: T);

  // Override this function and run any context-specific set up.
  public newContext = () => null;
}
