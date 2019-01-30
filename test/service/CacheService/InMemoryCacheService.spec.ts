import sinon from 'sinon';
import {
  InMemoryCacheService,
  ICacheService,
} from '../../../src/services/CacheService';
import { CacheServiceConfiguration } from '../../../src/services/CacheService/types';
import { EServiceName } from '../../../src/services/service/enums';
import { LoggingService } from '../../../src/services/LoggingService';
import { RecordNotFoundError } from '../../../src/services/CacheService/errors/RecordNotFoundError';

describe('Service: InMemoryCacheService', () => {
  describe('constructor', () => {
    it('creates a cache service', () => {
      const cache = new InMemoryCacheService();
      expect(cache.getServiceName()).toEqual(EServiceName.CacheService);
      expect(cache.getImplementationName()).toEqual('InMemoryCacheService');
    });
    it('uses the given logger', async () => {
      const cache = new InMemoryCacheService();
      const loggerSpy = sinon.spy();
      await cache.init({
        cacheName: 'mycache',
        log: () => loggerSpy,
      });
      expect(loggerSpy.calledOnce).toBe(true);
    });
    it('uses the default logger when not given one', async () => {
      const cache = new InMemoryCacheService();
      const loggerSpy = sinon.spy();
      sinon.stub(LoggingService, 'void').callsFake(() => loggerSpy);
      await cache.init({ cacheName: 'mycache' });
      expect(loggerSpy.calledOnce).toBe(true);
    });
  });

  describe('methods', () => {
    const CACHE_NAME = 'mycache';
    let cache: ICacheService<string>;

    // Create a new cache before each test
    beforeEach(async () => {
      const config: CacheServiceConfiguration = { cacheName: CACHE_NAME };
      cache = new InMemoryCacheService();
      await cache.init(config);
    });

    describe('constructor', () => {
      it('creates a cache with the right name', () => {
        expect(cache.getCacheName()).toEqual(CACHE_NAME);
      });
    });

    describe('put() & get()', () => {
      it('throws an error when getting non-existing record', () => {
        const test = () => cache.get('id');
        expect(test).toThrow(new RecordNotFoundError(CACHE_NAME, 'id'));
      });
      it('puts an item in the cache', () => {
        cache.put('id', 'data');
        expect(cache.get('id')).toEqual('data');
      });
      it('overrides an item already in the cache', () => {
        cache.put('id', 'data');
        cache.put('id', 'data1');
        expect(cache.get('id')).toEqual('data1');
      });
      it('gets the correct data', () => {
        cache.put('id1', 'data1');
        cache.put('id2', 'data2');
        expect(cache.get('id1')).toEqual('data1');
      });
    });

    describe('hasRecord()', () => {
      it('returns false for a non-existing record', () => {
        expect(cache.hasRecord('id')).toBe(false);
      });
      it('returns true for an existing record', () => {
        cache.put('id', 'data');
        expect(cache.hasRecord('id')).toBe(true);
      });
    });

    describe('getRecords()', () => {
      it('gets records in the cache', () => {
        cache.put('id1', 'data1', 0);
        cache.put('id2', 'data2', 0);
        cache.put('id3', 'data3', 0);
        expect(cache.getRecords()).toEqual([
          { key: 'id1', data: { data: 'data1', stale: false, seen: 0 } },
          { key: 'id2', data: { data: 'data2', stale: false, seen: 0 } },
          { key: 'id3', data: { data: 'data3', stale: false, seen: 0 } },
        ]);
      });
    });

    describe('isStale() & makeStale()', () => {
      it('throws error when record is not found - isStale()', () => {
        const test = () => cache.isStale('id');
        expect(test).toThrow(new RecordNotFoundError(CACHE_NAME, 'id'));
      });
      it('throws error when record is not found - makeStale()', () => {
        const test = () => cache.makeStale('id');
        expect(test).toThrow(new RecordNotFoundError(CACHE_NAME, 'id'));
      });
      it('returns true when record is stale', () => {
        cache.put('id', 'data');
        cache.makeStale('id');
        expect(cache.isStale('id')).toBe(true);
      });
      it('returns false when record is not stale', () => {
        cache.put('id', 'data');
        expect(cache.isStale('id')).toBe(false);
      });
      it('makes the correct item stale', () => {
        cache.put('id1', 'data1');
        cache.put('id2', 'data2');
        cache.makeStale('id1');
        expect(cache.isStale('id1')).toBe(true);
        expect(cache.isStale('id2')).toBe(false);
      });
    });

    describe('put() & olderThan()', () => {
      it('throws error when record is not found - olderThan()', () => {
        const test = () => cache.olderThan('id', 0);
        expect(test).toThrow(new RecordNotFoundError(CACHE_NAME, 'id'));
      });
      it('uses current date when not given - put()', () => {
        const dateStub = sinon.stub(Date, 'now').callsFake(() => 123);
        cache.put('id', 'data');
        expect(cache.lastSeen('id')).toBe(123);
        dateStub.restore();
      });
      it('uses current date when not given - olderThan()', () => {
        const dateStub = sinon.stub(Date, 'now').callsFake(() => 123);
        cache.put('id', 'data', 0);
        expect(cache.olderThan('id', 122)).toBe(true);
        dateStub.restore();
      });
      it('uses given date - olderThan()', () => {
        cache.put('id', 'data', 0);
        expect(cache.olderThan('id', 122, 100)).toBe(false);
      });
      it('returns true when record is older than specified amount', () => {
        const NOW = 123;
        const dateStub = sinon.stub(Date, 'now').callsFake(() => NOW);
        cache.put('id', 'data', 0);
        expect(cache.olderThan('id', NOW - 100)).toBe(true);
        dateStub.restore();
      });
      it('returns false when record is not older than specified amount', () => {
        const NOW = 123;
        const dateStub = sinon.stub(Date, 'now').callsFake(() => NOW);
        cache.put('id', 'data', 0);
        expect(cache.olderThan('id', NOW + 100)).toBe(false);
        dateStub.restore();
      });
    });

    describe('lastSeen()', () => {
      it('throws error when record is not found - lastSeen()', () => {
        const test = () => cache.lastSeen('id');
        expect(test).toThrow(new RecordNotFoundError(CACHE_NAME, 'id'));
      });
      it('should return when record was last seen', () => {
        cache.put('id', 'data', 123);
        expect(cache.lastSeen('id')).toBe(123);
      });
    });

    describe('reset()', () => {
      it('resets an empty cache', () => {
        expect(cache.getRecords()).toEqual([]);
        cache.reset();
        expect(cache.getRecords()).toEqual([]);
      });
      it('resets a non-empty cache', () => {
        cache.put('id1', 'data1');
        cache.put('id2', 'data2');
        cache.reset();
        expect(cache.getRecords()).toEqual([]);
      });
    });

    describe('seen()', () => {
      it('throws error when record is not found - seen()', () => {
        const test = () => cache.seen('id');
        expect(test).toThrow(new RecordNotFoundError(CACHE_NAME, 'id'));
      });
      it('marks record seen with given date', () => {
        cache.put('id', 'data', 0);
        cache.seen('id', 1);
        expect(cache.lastSeen('id')).toBe(1);
      });
      it('marks record seen with default date', () => {
        const NOW = 123;
        const dateStub = sinon.stub(Date, 'now').callsFake(() => NOW);
        cache.put('id', 'data', 0);
        cache.seen('id');
        expect(cache.lastSeen('id')).toBe(123);
        dateStub.restore();
      });
    });

    describe('remove()', () => {
      it('throws error when record is not found - remove()', () => {
        const test = () => cache.remove('id');
        expect(test).toThrow(new RecordNotFoundError(CACHE_NAME, 'id'));
      });
      it('removes the specified record', () => {
        cache.put('id', 'data');
        cache.remove('id');
        expect(cache.hasRecord('id')).toBe(false);
      });
    });
  });
});
