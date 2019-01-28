import {
  EmailAddress,
  PhoneNumber,
  URL,
  PositiveInt,
  PositiveFloat,
  NegativeInt,
  NegativeFloat,
  NonNegativeInt,
  NonNegativeFloat,
  NonPositiveInt,
  NonPositiveFloat,
} from '@okgrow/graphql-scalars/dist/index';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';

import ServerVersion from './customScalars/ServerVersion';

/**
 * Export all external/custom scalar definitions to add to the Resolver map.
 */
export default {
  // external types
  Email: EmailAddress,
  Phone: PhoneNumber,
  URL,
  PositiveInt,
  PositiveFloat,
  NegativeInt,
  NegativeFloat,
  NonNegativeInt,
  NonNegativeFloat,
  NonPositiveInt,
  NonPositiveFloat,
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  // custom types
  ServerVersion,
};
