import { GraphQLScalarType, Kind } from 'graphql';
import { UserInputError } from 'apollo-server-core';

const VersionRegex = /^v[0-9]{1,2}\.[0-9]{1,2}(\.[0-9]{1,2}([a-z])?)?$/;
const validator = value => VersionRegex.test(value);

export default new GraphQLScalarType({
  name: 'ServerVersion',
  description: 'The version of the server.',
  serialize: value => {
    if (validator(value)) return value;
    throw new Error(`Received invalid version identifier: '${value}'.`);
  },
  parseValue: value => {
    if (validator(value)) return value;
    throw new UserInputError(`'${value}' is not a valid version identifier.`);
  },
  parseLiteral: ast => {
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
});
