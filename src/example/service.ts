import { AbstractService } from '../services/service/AbstractService';
import { IExampleService } from './types';
import { EServiceName } from '../services/service/enums';

import { users } from './data';
import { UserInput, User } from '../graphql/typeDefs/models/User';

/**
 * This is an example service which provides methods to
 * query and mutate a sample data set.
 */
export class ExampleService extends AbstractService<{}>
  implements IExampleService {
  private users: User[];
  private idCount: number = users.length + 1;

  constructor() {
    super(EServiceName.ExampleService, 'ExampleService');
    this.users = [...users];
  }

  init = () => null;

  getUser(id: string) {
    let user = null;
    this.users.forEach(u => {
      if (u._id === id) user = u;
    });
    return user;
  }

  getUsers(limit: number) {
    if (limit === undefined) return this.users;
    return this.users.slice(0, limit);
  }

  addUser(user: UserInput) {
    const newUser = {
      _id: JSON.stringify(this.idCount++),
      ...user,
      friendIds: [],
    };
    this.users.push(newUser);
    return newUser;
  }

  deleteUser(id: string) {
    let removeIndex = -1;
    this.users.forEach((user, idx) => {
      if (user._id === id) removeIndex = idx;
    });
    if (removeIndex > -1) this.users.splice(removeIndex, 1);
    return this.users;
  }
}
