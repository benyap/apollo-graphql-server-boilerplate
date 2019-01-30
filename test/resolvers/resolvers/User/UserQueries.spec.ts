import sinon from 'sinon';

import { GraphQLContext } from '../../../../src/services/ContextCreatorService/types';
import { mockServiceLibrary } from '../../../utils/mockServiceLibrary';
import { ExampleService } from '../../../../src/services/ExampleService/service';
import { IExampleService } from '../../../../src/services/ExampleService/types';

import { getUserData } from '../../../../src/services/ExampleService/data';
import { UserQueries } from '../../../../src/graphql/resolvers/resolvers/User/UserQueries';
import { QueryResolvers } from '../../../../src/graphql/types';

describe('GraphQL resolver: UserQueries', () => {
  let example: IExampleService;
  let context: GraphQLContext;
  let getUserStub: sinon.SinonStub;
  let getUsersStub: sinon.SinonStub;

  beforeEach(async () => {
    example = new ExampleService();
    await example.init({ getUserData });

    // Mock getting a user
    getUserStub = sinon.stub(example, 'getUser');
    getUserStub.callsFake(() => Promise.resolve(getUserData()[0]));

    // Mock getting users
    getUsersStub = sinon.stub(example, 'getUsers');
    getUsersStub.callsFake(() => Promise.resolve(getUserData()));

    const { mockLib } = await mockServiceLibrary(example);
    context = { lib: mockLib };
  });

  it('get a user by id', async () => {
    const args: QueryResolvers.ArgsUser = { id: '1' };
    const result = await UserQueries.user(null, args, context, null);
    expect(result).toEqual(getUserData()[0]);
    expect(getUserStub.calledOnce).toBe(true);
    expect(getUserStub.calledWith('1')).toBe(true);
  });

  it('get users without limit', async () => {
    const args: QueryResolvers.ArgsUsers = {};
    const result = await UserQueries.users(null, args, context, null);
    expect(result).toEqual(getUserData());
    expect(getUsersStub.calledWith(undefined)).toBe(true);
  });

  it('get users with limit', async () => {
    const args: QueryResolvers.ArgsUsers = { limit: 10 };
    const result = await UserQueries.users(null, args, context, null);
    expect(result).toEqual(getUserData());
    expect(getUsersStub.calledWith(10)).toBe(true);
  });

  it('get expensive users', async () => {
    const args: QueryResolvers.ArgsUsers = {};
    const result = await UserQueries.expensiveUsers(null, args, context, null);
    expect(result).toEqual(getUserData());
    expect(getUsersStub.calledOnce).toBe(true);
  });
});
