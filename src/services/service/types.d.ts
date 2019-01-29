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

  /**
   * Let the service know that a new context was created.
   * This hook can be used to perform any set up that is
   * context specific, e.g. creating a new DataLoader
   * instance.
   */
  newContext(): void;
}
