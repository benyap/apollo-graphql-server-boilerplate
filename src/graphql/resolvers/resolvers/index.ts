/**
 * This resolver file was scaffolded by Prisma `graphqlgen`.
 * As you add more types to your schema, please make sure you
 * import them and add them to the resolver map.
 */

import { Resolvers } from '../../types';

// Root types
import { Query } from './Query';
import { Mutation } from './Mutation';
import { Subscription } from './Subscription';

// Custom types
import { User } from './User';
import { ServerDiagnostics } from './ServerDiagnostics';

export const resolvers: Resolvers = {
  Query,
  User,
  Mutation,
  ServerDiagnostics,
  Subscription,
};
