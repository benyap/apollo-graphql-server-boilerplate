import { ELogTopic, ILoggingService } from '../services/LoggingService';
import { IServiceLibrary } from '../services/ServiceLibrary';
import createNetworkService from '../services/NetworkService';
import AuthenticationService from '../services/AuthenticationService';
import ContextCreatorService from '../services/ContextCreatorService';

import { ServerConfiguration } from './types';

export default async (
  serverConfig: ServerConfiguration,
  loggingService: ILoggingService,
  serviceLibrary: IServiceLibrary,
) => {
  // Logging service
  serviceLibrary.addService(loggingService);

  // Network service
  const networkService = await createNetworkService({
    log: loggingService.createLogger(ELogTopic.NETWORK),
  });
  serviceLibrary.addService(networkService);

  // Authentication service
  const authenticationService = new AuthenticationService();
  await authenticationService.init({
    log: loggingService.createLogger(ELogTopic.AUTHENTICATION),
  });
  serviceLibrary.addService(authenticationService);

  // Context creator service
  const contextCreatorService = new ContextCreatorService();
  await contextCreatorService.init({
    serverConfig,
    authenticationService,
    serviceLibrary,
    log: loggingService.createLogger(ELogTopic.CONTEXTCREATOR),
  });
  serviceLibrary.addService(contextCreatorService);
};
