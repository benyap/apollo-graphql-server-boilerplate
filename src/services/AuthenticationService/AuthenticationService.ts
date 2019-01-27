import { AbstractService } from '../service/AbstractService';
import { EServiceName } from '../service/enums';

import { LoggingService, ELogLevel } from '../LoggingService';

import {
  AuthenticationServiceConfiguration,
  IAuthenticationService,
  AuthenticationResult,
} from './types';
// import { ICacheService } from '../CacheService';

export class AuthenticationService
  extends AbstractService<AuthenticationServiceConfiguration>
  implements IAuthenticationService {
  constructor() {
    super(EServiceName.AuthenticationService, 'AuthenticationService');
  }

  public async init(config: AuthenticationServiceConfiguration) {
    this.log = config.log || LoggingService.void;
    this.log(ELogLevel.DEBUG)('Authentication service initialised.');
  }

  /**
   * This method will authenticate the given token and return appropriate
   * user information if the token is valid.
   *
   * FIXME: This method needs a custom implementation.
   *
   * @param token the authorization token that needs to be authenticated
   */
  public async authenticate(token: string) {
    const result: AuthenticationResult = {};

    // FIXME: Add authentication logic here.
    this.log(ELogLevel.WARN)(`No authentication logic implemented.`);

    return result;
  }
}
