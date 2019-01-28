import { ServerEnvironment } from '../../../services/service/types';

export interface ServerDiagnostics {
  environment: ServerEnvironment;
  version: string;
  startDate: Date;
}
