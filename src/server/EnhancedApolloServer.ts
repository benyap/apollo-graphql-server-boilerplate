import express from 'express';
import { ApolloServer, GraphQLOptions, Config } from 'apollo-server-express';
import { default as costAnalysis } from 'graphql-cost-analysis';

/**
 * Extension to ApolloServer that injects the costAnalysis
 * validation rule into ApolloServer.
 *
 * Workaround for an existing issue found here:
 * https://github.com/pa-bru/graphql-cost-analysis/issues/12#issuecomment-420991259
 */
export class EnhancedApolloServer extends ApolloServer {
  private costAnalysisOptions: object = {};

  constructor(config: Config, costAnalysisOptions: object) {
    super(config);
    this.costAnalysisOptions = costAnalysisOptions;
  }

  public async createGraphQLServerOptions(
    req: express.Request,
    res: express.Response,
  ): Promise<GraphQLOptions> {
    const options = await super.createGraphQLServerOptions(req, res);

    let validationRules = [
      costAnalysis({
        ...this.costAnalysisOptions,
        variables: req.body.variables,
      }),
    ];

    if (options.validationRules && options.validationRules.length) {
      validationRules = [...validationRules, ...options.validationRules];
    }

    return { ...options, validationRules };
  }
}
