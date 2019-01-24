import { IService } from '../service/types';
import { FLoggerLevelOutputFunction } from '../LoggingService';

export interface CacheRecord<T> {
  /**
   * True if the record is considered stale and needs to be refreshed.
   */
  stale: boolean;

  /**
   * The time at which the record was last seen.
   * Stored as UTC time (milliseconds).
   */
  seen: number;

  /**
   * The data for this cache record.
   */
  data: T;
}

export interface CacheServiceConfiguration {
  /**
   * The name to give the cache being created.
   */
  cacheName: string;
  /**
   * Logging function.
   */
  log?: FLoggerLevelOutputFunction;
}

export interface ICacheService<T> extends IService<CacheServiceConfiguration> {
  /**
   * Check if record is in the cache.
   * @param id the id of the record to check.
   */
  hasRecord(id: string): boolean;

  /**
   * Get the list of records in the cache.
   */
  getRecords(): Array<{ key: string; data: CacheRecord<T> }>;

  /**
   * Check if a record's data is stale.
   * @param id the record id to check.
   */
  isStale(id: string): boolean;

  /**
   * Check if a record is older than the specified date (UTC - milliseconds).
   * @param id the record id to check.
   * @param ms check if the record is older than this number of milliseconds.
   * @param compareTo the current time in milliseconds to compare to.
   */
  olderThan(id: string, ms: number, compareTo?: number): boolean;

  /**
   * Check when the record was last seen (UTC - milliseconds).
   * @param id the record id to check.
   */
  lastSeen(id: string): number;

  /**
   * Get the record's data.
   * @param id the record id to check.
   */
  get(id: string): T;

  /**
   * Reset the cache.
   */
  reset();

  /**
   * Put a new record into the cache.
   * @param id the id to give the record.
   * @param data record data.
   * @param date the time (UTC - milliseconds) the record was put into the cache. Default uses `Date.now()`.
   */
  put(id: string, data: T, date?: number);

  /**
   * Update when a record was last seen.
   * @param id the id of the record to update.
   * @param date the time (UTC - milliseconds) the record was seen. Default uses `Date.now()`.
   */
  seen(id: string, date?: number);

  /**
   * Set a record to be stale.
   * @param id the id of the record to make stale.
   */
  makeStale(id: string);

  /**
   * Remove a record from the cache.
   * @param id the id of the record to remove.
   */
  remove(id: string);
}
