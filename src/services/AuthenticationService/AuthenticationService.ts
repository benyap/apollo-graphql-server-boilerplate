import { AbstractService } from '../service/AbstractService';
import { EServiceName } from '../service/enums';

import { LoggingService, LogLevel } from '../LoggingService';

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

  public init = async (config: AuthenticationServiceConfiguration) => {
    this.log = config.log || LoggingService.void;
    this.log(LogLevel.DEBUG)('Authentication service initialised.');
  };

  /**
   * This method will authenticate the given token and return appropriate
   * user information if the token is valid.
   *
   * FIXME: This method needs a custom implementation.
   *
   * @param token the authorization token that needs to be authenticated
   */
  public authenticate = async (token: string) => {
    const result: AuthenticationResult = {};

    // FIXME: Add authentication logic here.
    this.log(LogLevel.WARN)(`No authentication logic implemented.`);

    return result;
  };
}
