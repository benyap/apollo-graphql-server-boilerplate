export class RecordNotFoundError extends Error {
  constructor(cacheName: string, id: string) {
    super(`The record '${id}' could not be found in the cache [${cacheName}].`);
    this.name = 'RecordNotFound';
  }
}
