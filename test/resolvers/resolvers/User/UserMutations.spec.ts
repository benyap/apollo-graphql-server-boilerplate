import sinon from 'sinon';

import { GraphQLContext } from '../../../../src/services/ContextCreatorService/types';
import { mockServiceLibrary } from '../../../utils/mockServiceLibrary';
import { ExampleService } from '../../../../src/services/ExampleService/service';
import { IExampleService } from '../../../../src/services/ExampleService/types';

import { getUserData } from '../../../../src/services/ExampleService/data';
import { UserMutations } from '../../../../src/graphql/resolvers/resolvers/User/UserMutations';
import { MutationResolvers } from '../../../../src/graphql/types';

describe('GraphQL resolver: UserMutations', () => {
  let example: IExampleService;
  let context: GraphQLContext;
  let addUserStub: sinon.SinonStub;
  let deleteUserStub: sinon.SinonStub;

  beforeEach(async () => {
    example = new ExampleService();
    await example.init({ getUserData });

    // Mock adding a user
    addUserStub = sinon.stub(example, 'addUser');
    addUserStub.callsFake(user =>
      Promise.resolve({ ...user, _id: '21', friendIds: [] }),
    );

    // Mock deleting a user
    deleteUserStub = sinon.stub(example, 'deleteUser');
    deleteUserStub.callsFake(() => Promise.resolve(getUserData()));

    const { mockLib } = await mockServiceLibrary(example);
    context = { lib: mockLib };
  });

  it('adds a user', async () => {
    const args: MutationResolvers.ArgsAddUser = {
      user: { firstname: 'James', lastname: 'Simon' },
    };
    const result = await UserMutations.addUser(null, args, context, null);
    expect(result).toEqual({
      _id: '21',
      ...args.user,
      friendIds: [],
    });
    expect(addUserStub.calledOnce).toBe(true);
    expect(addUserStub.calledWith(args.user)).toBe(true);
  });
  it('deletes a user', async () => {
    const args: MutationResolvers.ArgsDeleteUser = { id: '1' };
    const result = await UserMutations.deleteUser(null, args, context, null);
    expect(result).toEqual(getUserData());
    expect(deleteUserStub.calledOnce).toBe(true);
    expect(deleteUserStub.calledWith('1')).toBe(true);
  });
});
