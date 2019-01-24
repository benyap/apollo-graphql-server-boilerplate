import { InMemoryCacheService } from './InMemoryCacheService';
import { ICacheService, CacheServiceConfiguration } from './types';

/**
 * Create a new cache instance.
 * @param cacheName the name for the cache
 * @param log logger function
 */
async function createCache<T>(options: CacheServiceConfiguration) {
  const service = new InMemoryCacheService<T>();
  await service.init(options);
  return service as ICacheService<T>;
}

export default createCache;

export { ICacheService, InMemoryCacheService };
