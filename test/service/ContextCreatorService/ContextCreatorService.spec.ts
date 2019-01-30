import sinon from 'sinon';
import {
  ContextCreatorService,
  IContextCreatorService,
} from '../../../src/services/ContextCreatorService';
import { EServiceName } from '../../../src/services/service/enums';
import { LoggingService } from '../../../src/services/LoggingService';
import InMemoryServiceLibrary, {
  IServiceLibrary,
} from '../../../src/services/ServiceLibrary';
import {
  IAuthenticationService,
  AuthenticationService,
} from '../../../src/services/AuthenticationService';
import { ServerConfiguration } from '../../../src/server/types';

describe('Service: ContextCreatorService', () => {
  describe('constructor', () => {
    it('creates a context creator service', () => {
      const context = new ContextCreatorService();
      expect(context.getServiceName()).toEqual(
        EServiceName.ContextCreatorService,
      );
      expect(context.getImplementationName()).toEqual('ContextCreatorService');
    });
    it('uses the given logger', async () => {
      const context = new ContextCreatorService();
      const loggerSpy = sinon.spy();
      await context.init({
        authenticationService: null,
        serverConfig: null,
        serviceLibrary: null,
        log: () => loggerSpy,
      });
      expect(loggerSpy.callCount).toBeGreaterThan(1);
    });
    it('uses the default logger when not given one', async () => {
      const context = new ContextCreatorService();
      const loggerSpy = sinon.spy();
      sinon.stub(LoggingService, 'void').callsFake(() => loggerSpy);
      await context.init({
        authenticationService: null,
        serverConfig: null,
        serviceLibrary: null,
      });
      expect(loggerSpy.callCount).toBeGreaterThan(1);
    });
  });

  describe('authenticate()', () => {
    let serviceLibrary: IServiceLibrary;
    let authenticationService: IAuthenticationService;
    let auth: IContextCreatorService;
    let serverConfig: ServerConfiguration;

    beforeEach(async () => {
      serviceLibrary = new InMemoryServiceLibrary();
      await serviceLibrary.init({});

      authenticationService = new AuthenticationService();
      await authenticationService.init({});

      serverConfig = {
        logger: null,
        startDate: new Date(2018, 0, 1),
        subdomains: [],
        version: '1.0.0',
      };

      auth = new ContextCreatorService();
      await auth.init({
        serviceLibrary,
        authenticationService,
        serverConfig,
      });
    });

    it('creates the context correctly', () => {
      // FIXME: implement test here
      auth.createContext('token');
      auth.createContext('token', ['action']);
    });
    it('handles errors gracefully', () => {
      // FIXME: implement test here
      auth.createContext();
      auth.createContext(1 as any, 1 as any);
    });
    it.skip('define more tests', () => {
      // TODO:
    });
  });
});
