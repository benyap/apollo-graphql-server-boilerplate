import { IService, ServerEnvironment } from '../service/types';

import { LoggerLevelOutputFn } from '../LoggingService';
import { IAuthenticationService } from '../AuthenticationService';
import { AuthenticationResult } from '../AuthenticationService/types';
import { IServiceLibrary } from '../ServiceLibrary';
import { ServerConfiguration } from '../../server/types';

export interface ContextCreatorServiceConfiguration {
  serverConfig: ServerConfiguration;
  authenticationService: IAuthenticationService;
  serviceLibrary: IServiceLibrary;
  log?: LoggerLevelOutputFn;
}

export interface GraphQLContext extends AuthenticationResult {
  serviceLibrary: IServiceLibrary;
  dataLoaders: {};
  diagnostics: {
    environment: ServerEnvironment;
    version: string;
    startDate: Date;
  };
}

export interface IContextCreatorService
  extends IService<ContextCreatorServiceConfiguration> {
  /**
   * Create context for GraphQL requests based on the requested action.
   * @param header the authorisation header.
   * @param actions list of actions that have been requested.
   */
  createContext(header?: string, actions?: string[]): Promise<GraphQLContext>;
}
