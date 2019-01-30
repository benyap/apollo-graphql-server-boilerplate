import createCacheService from '../../../src/services/CacheService';

describe('Service: createCache', () => {
  it('creates a cache with the correct name', async () => {
    const cache = await createCacheService({ cacheName: 'mycache' });
    expect(cache.getCacheName()).toEqual('mycache');
  });
});
