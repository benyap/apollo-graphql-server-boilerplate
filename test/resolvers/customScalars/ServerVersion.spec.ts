import { UserInputError } from 'apollo-server-core';
import { Kind } from 'graphql';

import ServerVersion, {
  ServerVersionDefinition,
} from '../../../src/graphql/resolvers/customScalars/ServerVersion';

describe('GraphQL scalar: ServerVersion', () => {
  const ACCEPT = [
    'v1.0',
    'v0.0.1',
    'v1.0.0',
    'v11.11',
    'v11.11.11',
    'v0.0.1a',
    'v0.0.1b',
    'v1.0.0-alpha',
    'v11.11.11-beta',
  ];

  const REJECT_STRING = [
    '',
    'v',
    '0.0.1',
    'v1.0.0.1',
    '1',
    'v1a',
    'v1.0.0-a',
    'v1.0.0alpha',
    'v11.a.1',
  ];

  const REJECT_NUMBER = [1.0, 2.2];

  it('has the correct name', () => {
    expect(ServerVersion.name).toEqual('ServerVersion');
  });

  describe('serialize()', () => {
    describe('serializes valid values', () => {
      ACCEPT.forEach(value => {
        it(value.toString(), () => {
          expect(ServerVersionDefinition.serialize(value)).toEqual(value);
        });
      });
    });

    describe('rejects invalid values', () => {
      it('null', () => {
        const test = () => ServerVersionDefinition.serialize(null);
        expect(test).toThrow(
          new Error(`Received invalid version identifier: '${null}'.`),
        );
      });
      REJECT_STRING.forEach(value => {
        it(value.toString(), () => {
          const test = () => ServerVersionDefinition.serialize(value);
          expect(test).toThrow(
            new Error(`Received invalid version identifier: '${value}'.`),
          );
        });
      });
      REJECT_NUMBER.forEach(value => {
        it(value.toString(), () => {
          const test = () => ServerVersionDefinition.serialize(value);
          expect(test).toThrow(
            new Error(`Received invalid version identifier: '${value}'.`),
          );
        });
      });
    });
  });

  describe('parseValue()', () => {
    describe('parses valid values', () => {
      ACCEPT.forEach(value => {
        it(value.toString(), () => {
          expect(ServerVersionDefinition.parseValue(value)).toEqual(value);
        });
      });
    });

    describe('rejects invalid values', () => {
      it('null', () => {
        const test = () => ServerVersionDefinition.parseValue(null);
        expect(test).toThrow(
          new UserInputError(`'${null}' is not a valid version identifier.`),
        );
      });
      REJECT_STRING.forEach(value => {
        it(value.toString(), () => {
          const test = () => ServerVersionDefinition.parseValue(value);
          expect(test).toThrow(
            new UserInputError(`'${value}' is not a valid version identifier.`),
          );
        });
      });
      REJECT_NUMBER.forEach(value => {
        it(value.toString(), () => {
          const test = () => ServerVersionDefinition.parseValue(value);
          expect(test).toThrow(
            new UserInputError(`'${value}' is not a valid version identifier.`),
          );
        });
      });
    });
  });

  describe('parseValue()', () => {
    describe('parses valid literal values', () => {
      ACCEPT.forEach(value => {
        it(value.toString(), () => {
          expect(
            ServerVersionDefinition.parseLiteral(
              {
                kind: 'StringValue',
                loc: null,
                value: value,
                block: false,
              },
              {},
            ),
          ).toEqual(value);
        });
      });
    });
    describe('rejects invalid literal values', () => {
      it('null', () => {
        const test = () => ServerVersionDefinition.parseLiteral(null, {});
        expect(test).toThrow(
          new UserInputError(
            `Version is expected to be of type ${
              Kind.STRING
            }, received ${null}.`,
          ),
        );
      });
      REJECT_STRING.forEach(value => {
        it(value.toString(), () => {
          const test = () =>
            ServerVersionDefinition.parseLiteral(
              {
                kind: 'StringValue',
                loc: null,
                value: value,
                block: false,
              },
              {},
            );
          expect(test).toThrow(
            new UserInputError(`'${value}' is not a valid version identifier.`),
          );
        });
      });
      REJECT_NUMBER.forEach(value => {
        it(value.toString(), () => {
          const test = () =>
            ServerVersionDefinition.parseLiteral(
              {
                kind: 'FloatValue',
                value: value.toString(),
              },
              {},
            );
          expect(test).toThrow(
            new UserInputError(
              `Version is expected to be of type ${Kind.STRING}, received ${
                Kind.FLOAT
              }.`,
            ),
          );
        });
      });
    });
  });
});
