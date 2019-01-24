import { IService } from '../service/types';

import { FLoggerLevelOutputFunction } from '../LoggingService';
import { EServiceName } from '../service/enums';

export interface ServiceLibraryConfiguration {
  log?: FLoggerLevelOutputFunction;
}

export interface IServiceLibrary extends IService<ServiceLibraryConfiguration> {
  /**
   * Add a service to the service library.
   */
  addService(service: IService<object>, identifier?: string);

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
  );
}
