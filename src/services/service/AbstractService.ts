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

  public getServiceName() {
    return this.serviceName;
  }

  public getImplementationName() {
    return this.implementationName;
  }

  public abstract init(config: T);

  public newContext() {
    // Override this function and run any context-specific set up.
  }
}
