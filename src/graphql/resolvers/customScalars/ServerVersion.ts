import {
  GraphQLScalarType,
  Kind,
  GraphQLScalarTypeConfig,
  ValueNode,
} from 'graphql';
import { UserInputError } from 'apollo-server-core';

const VersionRegex = /^v[0-9]{1,2}\.[0-9]{1,2}(\.[0-9]{1,2}([a-z]|-[a-z]{2,})?)?$/;
const validator = value => VersionRegex.test(value);

export const ServerVersionDefinition: GraphQLScalarTypeConfig<
  string,
  string
> = {
  name: 'ServerVersion',
  description: 'The version of the server.',

  // Serializes an internal value to include in a response.
  serialize: (value: string) => {
    if (validator(value)) return value;
    throw new Error(`Received invalid version identifier: '${value}'.`);
  },

  // Parses an externally provided value to use as an input.
  parseValue: (value: string) => {
    if (validator(value)) return value;
    throw new UserInputError(`'${value}' is not a valid version identifier.`);
  },

  // Parses an externally provided literal value to use as an input.
  parseLiteral: (ast: ValueNode) => {
    if (ast && ast.kind === Kind.STRING) {
      if (validator(ast.value)) return ast.value;
      throw new UserInputError(
        `'${ast.value}' is not a valid version identifier.`,
      );
    }
    throw new UserInputError(
      `Version is expected to be of type ${Kind.STRING}, received ${
        ast ? ast.kind : null
      }.`,
    );
  },
};

export default new GraphQLScalarType(ServerVersionDefinition);
