import sinon from 'sinon';

import { GraphQLContext } from '../../../../src/services/ContextCreatorService/types';
import { mockServiceLibrary } from '../../../utils/mockServiceLibrary';
import { ExampleService } from '../../../../src/services/ExampleService/service';
import { IExampleService } from '../../../../src/services/ExampleService/types';

import { getUserData } from '../../../../src/services/ExampleService/data';
import { UserMutations } from '../../../../src/graphql/resolvers/resolvers/User/UserMutations';
import { UserSubscriptions } from '../../../../src/graphql/resolvers/resolvers/User/UserSubscriptions';
import { MutationResolvers } from '../../../../src/graphql/types';

describe('GraphQL resolver: UserSubscriptions', () => {
  let example: IExampleService;
  let context: GraphQLContext;
  let addUserStub: sinon.SinonStub;

  beforeEach(async () => {
    example = new ExampleService();
    await example.init({ getUserData });

    // Mock add user
    addUserStub = sinon.stub(example, 'addUser');
    addUserStub.callsFake(() => Promise.resolve(getUserData()[5]));

    const { mockLib } = await mockServiceLibrary(example);
    context = { lib: mockLib };
  });

  it('notifies subscribers when a user is created', async () => {
    const subscription = await UserSubscriptions.newUser.subscribe(
      null,
      null,
      context,
      null,
    );
    const args: MutationResolvers.ArgsAddUser = { user: getUserData()[5] };
    await UserMutations.addUser(null, args, context, null);
    const result = await subscription.next();
    expect(result.value).toEqual(getUserData()[5]);
    expect(result.done).toBe(false);
  }, 1000);
});
