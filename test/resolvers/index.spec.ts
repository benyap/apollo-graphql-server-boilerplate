import generateResolvers from '../../src/graphql/resolvers';

describe('GraphQL: generate resolvers', () => {
  it('returns resolvers', () => {
    const resolvers = generateResolvers();
    expect(Object.keys(resolvers).length).not.toBe(0);
  });
  it('contains the root query resolver', () => {
    const resolvers = generateResolvers();
    expect((resolvers as any).Query).not.toBeNull();
  });
  it('contains the root mutation resolver', () => {
    const resolvers = generateResolvers();
    expect((resolvers as any).Mutation).not.toBeNull();
  });
  it('contains the root subscription resolver', () => {
    const resolvers = generateResolvers();
    expect((resolvers as any).Subscription).not.toBeNull();
  });
});
