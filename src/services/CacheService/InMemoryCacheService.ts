import { EServiceName } from '../service/enums';
import { AbstractService } from '../service/AbstractService';
import { LoggingService, ELogLevel } from '../LoggingService';

import { RecordNotFoundError } from './errors/RecordNotFoundError';
import { ICacheService, CacheRecord, CacheServiceConfiguration } from './types';

export class InMemoryCacheService<T>
  extends AbstractService<CacheServiceConfiguration>
  implements ICacheService<T> {
  private cacheName: string;
  private records: { [key: string]: CacheRecord<T> } = {};

  constructor() {
    super(EServiceName.CacheService, 'InMemoryCacheService');
  }

  public async init(config: CacheServiceConfiguration) {
    this.cacheName = config.cacheName;
    this.log = config.log || LoggingService.void;
    this.log(ELogLevel.DEBUG)(`Cache service initialised [${this.cacheName}].`);
  }

  public hasRecord = (id: string) => !!this.records[id];

  public getRecords = () =>
    Object.keys(this.records).map(key => ({ key, data: this.records[key] }));

  public isStale = (id: string) => {
    if (!this.hasRecord(id)) throw new RecordNotFoundError(this.cacheName, id);
    return this.records[id].stale;
  };

  public olderThan = (
    id: string,
    ms: number,
    compareTo: number = Date.now(),
  ) => {
    if (!this.hasRecord(id)) throw new RecordNotFoundError(this.cacheName, id);
    return compareTo - this.records[id].seen > ms;
  };

  public lastSeen = (id: string) => {
    if (!this.hasRecord(id)) throw new RecordNotFoundError(this.cacheName, id);
    return this.records[id].seen;
  };

  public get = (id: string) => {
    if (!this.hasRecord(id)) throw new RecordNotFoundError(this.cacheName, id);
    return this.records[id].data;
  };

  public reset = () => {
    this.log(ELogLevel.DEBUG)(`Cache[${this.cacheName}]: Resetting records`);
    this.records = {};
  };

  public put = (id: string, data: T, time: number = Date.now()) => {
    this.log(ELogLevel.DEBUG)(
      `Cache[${this.cacheName}]: Putting ${id} in cache`,
    );
    this.records[id] = {
      stale: false,
      seen: time,
      data,
    };
  };

  public seen = (id: string, date: number = Date.now()) => {
    if (!this.hasRecord(id)) throw new RecordNotFoundError(this.cacheName, id);
    this.log(ELogLevel.SILLY)(`Cache[${this.cacheName}]: Saw ${id}`);
    this.records[id].seen = date;
  };

  public makeStale = (id: string) => {
    this.log(ELogLevel.SILLY)(`Cache[${this.cacheName}]: ${id} got stale`);
    if (!this.hasRecord(id)) throw new RecordNotFoundError(this.cacheName, id);
    this.records[id].stale = true;
  };

  public remove = (id: string) => {
    if (!this.hasRecord(id)) throw new RecordNotFoundError(this.cacheName, id);
    this.log(ELogLevel.DEBUG)(
      `Cache[${this.cacheName}]: Removing ${id} from cache`,
    );
    delete this.records[id];
  };
}
