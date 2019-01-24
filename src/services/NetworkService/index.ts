import { AxiosNetworkService } from './AxiosNetworkService';
import { INetworkService, NetworkServiceConfiguration } from './types';

async function createNetworkService(config: NetworkServiceConfiguration) {
  const service = new AxiosNetworkService();
  await service.init(config);
  return service as INetworkService;
}

export default createNetworkService;

export { INetworkService, AxiosNetworkService };
