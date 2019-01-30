import { ServerDiagnostics } from '../../../../src/graphql/resolvers/resolvers/ServerDiagnostics/ServerDiagnostics';
import { ServerDiagnostics as ServerDiagnosticsModel } from '../../../../src/graphql/typeDefs/models/ServerDiagnostics';

describe('GraphQL resolver: ServerDiagnostics', () => {
  const diagnostics: ServerDiagnosticsModel = {
    environment: 'local',
    version: 'v1.0.0',
    startDate: new Date(2019, 0, 1),
  };

  describe('default resolvers', () => {
    it('ServerDiagnostics.startDate', () => {
      expect(
        ServerDiagnostics.startDate(diagnostics, null, null, null),
      ).toEqual(new Date(2019, 0, 1));
    });
    it('ServerDiagnostics.startDate', () => {
      expect(ServerDiagnostics.version(diagnostics, null, null, null)).toEqual(
        'v1.0.0',
      );
    });
    it('ServerDiagnostics.environment', () => {
      expect(
        ServerDiagnostics.environment(diagnostics, null, null, null),
      ).toEqual('local');
    });
  });
});
