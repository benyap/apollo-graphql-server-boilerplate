import {
  QueryResolvers,
  ServerDiagnosticsResolvers,
  UserResolvers,
  MutationResolvers,
  SubscriptionResolvers,
} from '../types';

export interface CostMapField {
  complexity?: number;
  multipliers?: string[];
  useMultipliers?: boolean;
}

/**
 * The cost map type can contain all fields that are available
 * through the GraphQL schema. All new object types must be added
 * here as a `Custom Type`.
 *
 * This is auto-generated, DO NOT EDIT.
 */
type CostMap = Partial<{
  // Root fields
  Query: Partial<{ [field in keyof QueryResolvers.Type]: CostMapField }>;
  Mutation: Partial<{ [field in keyof MutationResolvers.Type]: CostMapField }>;
  Subscription: Partial<
    { [field in keyof SubscriptionResolvers.Type]: CostMapField }
  >;
  // Custom Types
  ServerDiagnostics: Partial<
    { [field in keyof ServerDiagnosticsResolvers.Type]: CostMapField }
  >;
  User: Partial<{ [field in keyof UserResolvers.Type]: CostMapField }>;
}>;
