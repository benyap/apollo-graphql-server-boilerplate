import createNetworkService from '../services/NetworkService';
import { ELogTopic, ILoggingService } from '../services/LoggingService';
import { IServiceLibrary } from '../services/ServiceLibrary';

import { ServerConfiguration } from './types';

export default async (
  serverConfig: ServerConfiguration,
  loggingService: ILoggingService,
  serviceLibrary: IServiceLibrary,
) => {
  // Add Logging service
  serviceLibrary.addService(loggingService);

  // Network service
  const networkService = await createNetworkService({
    log: loggingService.createLogger(ELogTopic.NETWORK),
  });
  serviceLibrary.addService(networkService);
};
