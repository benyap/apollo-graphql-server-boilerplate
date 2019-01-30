import sinon from 'sinon';
import { InMemoryServiceLibrary } from '../../src/services/ServiceLibrary';
import { IService } from '../../src/services/service/types';
import { EServiceName } from '../../src/services/service/enums';

/**
 * Create a mock service library instance that returns a given
 * service when `getService()` is called. The library will
 * ALWAYS return the service, regardless of the arguments it
 * is given.
 *
 * @param service the service to return
 */
const mockServiceLibrary = async (service: IService<any>) => {
  const mockLib = new InMemoryServiceLibrary();
  await mockLib.init({});
  const getServiceStub = sinon.stub(mockLib, 'getService');
  getServiceStub.callsFake(() => service);
  return { mockLib, getServiceStub };
};

/**
 * Create a mock service library instance that returns a
 * service based on the given key. This allows multiple
 * services to be returned in the same mock instances, you
 * just have to make sure that you map the services to the
 * correct name.
 *
 * @param services a mapping of keys to services
 */
const mockServiceLibraries = async (services: {
  [key: string]: IService<any>;
}) => {
  const mockLib = new InMemoryServiceLibrary();
  await mockLib.init({});
  const getServiceStub = sinon.stub(mockLib, 'getService');

  getServiceStub.callsFake(
    (serviceName: EServiceName, identifier: string = '') => {
      const key = `${serviceName}${identifier ? `-${identifier}` : ''}`;
      return services[key];
    },
  );

  return { mockLib, getServiceStub };
};

export { mockServiceLibrary, mockServiceLibraries };
