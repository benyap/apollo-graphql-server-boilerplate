import sinon from 'sinon';

import { User } from '../../../../src/graphql/resolvers/resolvers/User/User';
import { User as UserModel } from '../../../../src/graphql/typeDefs/models/User';
import { ExampleService } from '../../../../src/services/ExampleService/service';
import { getUserData } from '../../../../src/services/ExampleService/data';
import { EServiceName } from '../../../../src/services/service/enums';

import { mockServiceLibrary } from '../../../utils/mockServiceLibrary';

describe('GraphQL resolver: User', () => {
  const user: UserModel = {
    _id: '1',
    firstname: 'John',
    lastname: 'Smith',
    friendIds: ['2', '3'],
  };

  const friends: UserModel[] = [
    {
      _id: '2',
      firstname: 'One',
      lastname: 'Friend',
      friendIds: ['1'],
    },
    {
      _id: '3',
      firstname: 'Two',
      lastname: 'Friend',
      friendIds: ['1'],
    },
  ];

  describe('default resolvers', () => {
    it('User._id', () => {
      expect(User._id(user, null, null, null)).toEqual(user._id);
    });
    it('User.firstname', () => {
      expect(User.firstname(user, null, null, null)).toEqual(user.firstname);
    });
    it('User.lastname', () => {
      expect(User.lastname(user, null, null, null)).toEqual(user.lastname);
    });
  });

  describe('User.friends', async () => {
    // Mock example service
    const example = new ExampleService();
    await example.init({ getUserData });
    const loadUsersStub = sinon.stub(example, 'loadUsers');
    loadUsersStub.callsFake(() => Promise.resolve(friends));

    // Set up a mock service library
    const { mockLib, getServiceStub } = await mockServiceLibrary(example);

    // Execute the resolver
    const context = { lib: mockLib };
    const result = await User.friends(user, null, context, null);

    expect(result).toEqual(friends);
    expect(getServiceStub.args[0][0]).toBe(EServiceName.ExampleService);
    expect(loadUsersStub.args[0][0]).toEqual(['2', '3']);
  });
});
