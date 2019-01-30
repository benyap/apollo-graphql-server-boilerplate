import { ServerDiagnosticsQueries } from '../../../../src/graphql/resolvers/resolvers/ServerDiagnostics/ServerDiagnosticsQueries'; // tslint:disable-line
import { ServerDiagnostics as ServerDiagnosticsModel } from '../../../../src/graphql/typeDefs/models/ServerDiagnostics';

describe('GraphQL resolver: ServerDiagnosticsQueries', () => {
  const diagnostics: ServerDiagnosticsModel = {
    environment: 'local',
    version: 'v1.0.0',
    startDate: new Date(2019, 0, 1),
  };

  it('serverDiagnostics', () => {
    expect(
      ServerDiagnosticsQueries.serverDiagnostics(
        null,
        null,
        { diagnostics },
        null,
      ),
    ).toEqual(diagnostics);
  });
});
