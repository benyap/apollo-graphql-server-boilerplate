import createLoggingService from '../../../src/services/LoggingService';
import { EServiceName } from '../../../src/services/service/enums';

describe('createLoggingService', () => {
  it('creates a logging service without colour', async () => {
    const log = await createLoggingService({
      timezone: 'tz',
      showLogLevels: [],
      showLogTopics: [],
    });
    expect(log.getServiceName()).toEqual(EServiceName.LoggingService);
    expect(log.getImplementationName()).toEqual('GenericLoggingService');
    expect(log.usingColor()).toBe(false);
  });
  it('creates a logging service without colour', async () => {
    const log = await createLoggingService(
      {
        timezone: 'tz',
        showLogLevels: [],
        showLogTopics: [],
      },
      true,
    );
    expect(log.getServiceName()).toEqual(EServiceName.LoggingService);
    expect(log.getImplementationName()).toEqual('GenericLoggingService');
    expect(log.usingColor()).toBe(true);
  });
});
