import { Resolvers } from '../../types';

// Root types
import { Query } from './Query';
import { Mutation } from './Mutation';
import { Subscription } from './Subscription';

// Custom types
import { User } from './User/User';
import { ServerDiagnostics } from './ServerDiagnostics/ServerDiagnostics';

export const resolvers: Resolvers = {
  Query,
  User,
  Mutation,
  ServerDiagnostics,
  Subscription,
};
