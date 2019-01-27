import { AbstractService } from '../../../src/services/service/AbstractService';
import { EServiceName } from '../../../src/services/service/enums';
import { IService } from '../../../src/services/service/types';

export interface ISampleService extends IService<{}> {}

export class SampleService extends AbstractService<{}>
  implements ISampleService {
  constructor() {
    super(EServiceName.ServiceLibrary, 'SampleService');
  }

  public async init(config: {}) {
    //
  }
}
