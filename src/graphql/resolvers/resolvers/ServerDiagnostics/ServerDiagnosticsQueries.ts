import { IServerDiagnosticsQueries } from './types';

export const ServerDiagnosticsQueries: IServerDiagnosticsQueries = {
  serverDiagnostics: (parent, args, ctx) => {
    return ctx.diagnostics;
  },
};
