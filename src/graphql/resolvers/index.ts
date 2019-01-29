import Scalars from './Scalars';
import { resolvers } from './resolvers';

/**
 * Generate the resolvers for the GraphQL server. Resolver
 * signatures are automatically generated using Prisma's
 * `graphqlgen` package. See the README for instructions
 * on how to generate types.
 *
 * @param env the current server environment (UNUSED)
 */
const generateResolvers = (env: string) => {
  return {
    ...(resolvers as object),
    ...Scalars,
  };
};

export default generateResolvers;
