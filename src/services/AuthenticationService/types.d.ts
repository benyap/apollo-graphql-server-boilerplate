import { IService } from '../service/types';

import { LoggerLevelOutputFn } from '../LoggingService';
import { ICacheService } from '../CacheService';

export interface AuthenticationResult {}

export interface AuthenticationServiceConfiguration {
  log?: LoggerLevelOutputFn;
}

export interface IAuthenticationService
  extends IService<AuthenticationServiceConfiguration> {
  /**
   * Authenticate an authorisation header.
   */
  authenticate(token: string): Promise<AuthenticationResult>;
}
