import sinon from 'sinon';
import {
  AuthenticationService,
  IAuthenticationService,
} from '../../../src/services/AuthenticationService';
import { EServiceName } from '../../../src/services/service/enums';
import { LoggingService } from '../../../src/services/LoggingService';

describe('Service: AuthenticationService', () => {
  describe('constructor', () => {
    it('creates an authentication service', () => {
      const auth = new AuthenticationService();
      expect(auth.getServiceName()).toEqual(EServiceName.AuthenticationService);
      expect(auth.getImplementationName()).toEqual('AuthenticationService');
    });
    it('uses the given logger', async () => {
      const auth = new AuthenticationService();
      const loggerSpy = sinon.spy();
      await auth.init({ log: () => loggerSpy });
      expect(loggerSpy.calledOnce).toBe(true);
    });
    it('uses the default logger when not given one', async () => {
      const auth = new AuthenticationService();
      const loggerSpy = sinon.spy();
      sinon.stub(LoggingService, 'void').callsFake(() => loggerSpy);
      await auth.init({});
      expect(loggerSpy.calledOnce).toBe(true);
    });
  });

  describe('authenticate()', () => {
    let auth: IAuthenticationService;

    beforeEach(async () => {
      auth = new AuthenticationService();
      await auth.init({});
    });

    it('authenticates correctly', () => {
      // FIXME: implement test here
      auth.authenticate('token');
    });
    it.skip('define more tests', () => {
      // TODO:
    });
  });
});
