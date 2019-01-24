export class ServiceUnavailableError extends Error {
  constructor(serviceName: string) {
    super(`The service '${serviceName}' is not available.`);
  }
}
