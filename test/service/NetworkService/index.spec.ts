import createNetworkService from '../../../src/services/NetworkService';
import { EServiceName } from '../../../src/services/service/enums';

describe('Service: createNetworkService', () => {
  it('creates a network service', async () => {
    const net = await createNetworkService({});
    expect(net.getServiceName()).toEqual(EServiceName.NetworkService);
    expect(net.getImplementationName()).toEqual('AxiosNetworkService');
  });
});
