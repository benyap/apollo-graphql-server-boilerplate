import { EServiceName } from './enums';

export type ServerEnvironment = 'local' | 'dev' | 'qat' | 'production';

export interface IService<T> {
  /**
   * Get the name for this service.
   */
  getServiceName(): EServiceName;

  /**
   * Gets the unique name for this service's implementation.
   */
  getImplementationName(): string;

  /**
   * Initialise the service.
   */
  init(config: T): Promise<any>;
}
