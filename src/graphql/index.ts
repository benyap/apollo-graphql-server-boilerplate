import generateTypeDefs from './typeDefs';
import generateResolvers from './resolvers';
import generateSchemaDirectives from './schemaDirectives';

/**
 * Generate GraphQL definitions for the server.
 * Each compnoent, can use the current server (if required)
 * environment to generate their definitions accordingly.
 *
 * @param env the environment the server is in
 */
const generateGraphQLDefinitions = (env: string) => ({
  typeDefs: generateTypeDefs(env),
  resolvers: generateResolvers(env),
  schemaDirectives: generateSchemaDirectives(env),
});

export default generateGraphQLDefinitions;
