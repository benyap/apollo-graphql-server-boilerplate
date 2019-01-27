import sinon from 'sinon';

import { ISampleService, SampleService } from './SampleService';
import { LoggingService } from '../../../src/services/LoggingService';
import ServiceLibrary, {
  IServiceLibrary,
} from '../../../src/services/ServiceLibrary';
import { EServiceName } from '../../../src/services/service/enums';
import { ServiceUnavailableError } from '../../../src/services/ServiceLibrary/errors/ServiceUnavailableError';

describe('ServiceLibrary', () => {
  describe('constructor', () => {
    it('creates a service library', () => {
      const library = new ServiceLibrary();
      expect(library.getServiceName()).toEqual(EServiceName.ServiceLibrary);
      expect(library.getImplementationName()).toEqual('InMemoryServiceLibrary');
    });
    it('uses the given logger', async () => {
      const library = new ServiceLibrary();
      const loggerSpy = sinon.spy();
      await library.init({ log: () => loggerSpy });
      expect(loggerSpy.calledOnce).toBe(true);
    });
    it('uses the default logger when not given one', async () => {
      const library = new ServiceLibrary();
      const loggerSpy = sinon.spy();
      sinon.stub(LoggingService, 'void').callsFake(() => loggerSpy);
      await library.init({});
      expect(loggerSpy.calledOnce).toBe(true);
    });
  });

  describe('methods', () => {
    let library: IServiceLibrary;
    let service: ISampleService;

    beforeEach(async () => {
      library = new ServiceLibrary();
      await library.init({});
      service = new SampleService();
      await service.init({});
    });

    it('adds a service to the library', () => {
      library.addService(service);
      expect(library.getService(EServiceName.ServiceLibrary)).toEqual(service);
    });
    it('adds a service with a unique identifier to the library', () => {
      library.addService(service, 'unique');
      expect(library.getService(EServiceName.ServiceLibrary, 'unique')).toEqual(
        service,
      );
    });
    it('throws an error when a service cannot be found', () => {
      const test = () => library.getService(EServiceName.ServiceLibrary);
      expect(test).toThrow(
        new ServiceUnavailableError(EServiceName.ServiceLibrary),
      );
    });
    it('throws an error when a service with a unique identifier cannot be found', () => {
      library.addService(service);
      const test = () =>
        library.getService(EServiceName.ServiceLibrary, 'unique');
      expect(test).toThrow(
        new ServiceUnavailableError(`${EServiceName.ServiceLibrary}-unique`),
      );
    });
    it('removes an existing service', () => {
      library.addService(service);
      expect(library.getService(EServiceName.ServiceLibrary)).toEqual(service);
      library.removeService(EServiceName.ServiceLibrary);
      const test = () => library.getService(EServiceName.ServiceLibrary);
      expect(test).toThrow(
        new ServiceUnavailableError(EServiceName.ServiceLibrary),
      );
    });
    it('removes an existing service with a unique identifier', () => {
      library.addService(service, 'unique');
      expect(library.getService(EServiceName.ServiceLibrary, 'unique')).toEqual(
        service,
      );
      library.removeService(EServiceName.ServiceLibrary, 'unique');
      const test = () => library.getService(EServiceName.ServiceLibrary);
      expect(test).toThrow(
        new ServiceUnavailableError(EServiceName.ServiceLibrary),
      );
    });
    it('removes the correct service', () => {
      library.addService(service);
      expect(library.getService(EServiceName.ServiceLibrary)).toEqual(service);
      library.removeService(EServiceName.ServiceLibrary, 'other');
      expect(library.getService(EServiceName.ServiceLibrary)).toEqual(service);
    });
  });
});
