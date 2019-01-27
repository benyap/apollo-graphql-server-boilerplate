import { IService } from '../service/types';

import { LoggerLevelOutputFn } from '../LoggingService';
import { EServiceName } from '../service/enums';

export interface ServiceLibraryConfiguration {
  log?: LoggerLevelOutputFn;
}

export interface IServiceLibrary extends IService<ServiceLibraryConfiguration> {
  /**
   * Add a service to the service library.
   * Returns the key that was used to store the service.
   */
  addService(service: IService<object>, identifier?: string): string;

  /**
   * Remove a service from the service library.
   */
  removeService(serviceName: EServiceName, identifier?: string);

  /**
   * Get a service from the service library.
   * Throws an error if a service is not found.
   */
  getService<T extends IService<object>>(
    serviceName: EServiceName,
    identifier?: string,
  ): T;
}
