import { AbstractService } from '../service/AbstractService';
import { IService } from '../service/types';
import { EServiceName } from '../service/enums';

import { LogLevel, LoggingService } from '../LoggingService';

import { ServiceUnavailableError } from './errors/ServiceUnavailableError';
import { IServiceLibrary, ServiceLibraryConfiguration } from './types';

export class InMemoryServiceLibrary
  extends AbstractService<ServiceLibraryConfiguration>
  implements IServiceLibrary {
  private services: { [key: string]: IService<object> };

  constructor() {
    super(EServiceName.ServiceLibrary, 'InMemoryServiceLibrary');
  }

  public init = async (config: ServiceLibraryConfiguration) => {
    this.services = {};
    this.log = config.log || LoggingService.void;
    this.log(LogLevel.DEBUG)(`Service library initialised.`);
  };

  public addService = (service: IService<object>, identifier: string = '') => {
    const key = `${service.getServiceName()}${
      identifier ? `-${identifier}` : ''
    }`;
    this.services[key] = service;
    this.log(LogLevel.SILLY)(`Added service: ${key}`);
    return key;
  };

  public removeService = (
    serviceName: EServiceName,
    identifier: string = '',
  ) => {
    const key = `${serviceName}${identifier ? `-${identifier}` : ''}`;
    delete this.services[key];
    this.log(LogLevel.SILLY)(`Removed service: ${key}`);
  };

  public getService = <T extends IService<object>>(
    serviceName: EServiceName,
    identifier: string = '',
  ) => {
    const key = `${serviceName}${identifier ? `-${identifier}` : ''}`;
    const service = this.services[key] as T;
    if (!service) throw new ServiceUnavailableError(key);
    return service;
  };

  public getServices = () =>
    Object.keys(this.services).map(id => this.services[id]);
}
