import DataLoader from 'dataloader';

import { AbstractService } from '../services/service/AbstractService';
import { IExampleService } from './types';
import { EServiceName } from '../services/service/enums';

import { users } from './data';
import { UserInput, User } from '../graphql/typeDefs/models/User';
import {
  LogLevel,
  LoggerLevelOutputFn,
  LoggingService,
} from '../services/LoggingService';

import { delay } from './utils';

/**
 * This is an example service which provides methods to
 * query and mutate a sample data set.
 */
export class ExampleService
  extends AbstractService<{ logger: LoggerLevelOutputFn }>
  implements IExampleService {
  private users: User[];
  private idCount: number = users.length + 1;
  private loader: DataLoader<string, User>;

  constructor() {
    super(EServiceName.ExampleService, 'ExampleService');
    this.users = [...users];
  }

  public init = async (config: { logger: LoggerLevelOutputFn }) => {
    this.log = config.logger || LoggingService.void;
  };

  public newContext = () => {
    this.log(LogLevel.SILLY)(`Created new DataLoader`);
    this.loader = new DataLoader<string, User>(this.batchLoadUsers);
  };

  public getUser = async (id: string) => {
    this.log(LogLevel.SILLY)(`Getting user ${id}`);
    await delay(200);
    return this.users.filter(u => u._id === id)[0];
  };

  public getUsers = async (limit?: number) => {
    this.log(LogLevel.SILLY)(`Getting users (bulk)`);
    await delay(200);
    if (limit === undefined) return this.users;
    return this.users.slice(0, limit);
  };

  public loadUser = (id: string) => {
    return this.loader.load(id);
  };

  public loadUsers = async (ids: string[]) => {
    return this.loader.loadMany(ids);
  };

  public addUser = async (user: UserInput) => {
    const newUser = {
      _id: JSON.stringify(this.idCount++),
      ...user,
      friendIds: [],
    };
    this.log(LogLevel.SILLY)(`Adding user`);
    await delay(200);
    this.users.push(newUser);
    return newUser;
  };

  public deleteUser = async (id: string) => {
    let removeIndex = -1;
    this.users.forEach((user, idx) => {
      if (user._id === id) removeIndex = idx;
    });
    this.log(LogLevel.SILLY)(`Deleting user ${id}`);
    await delay(200);
    if (removeIndex > -1) this.users.splice(removeIndex, 1);
    return this.users;
  };

  private batchLoadUsers = async (ids: string[]) => {
    const uniqueIds = Array.from(new Set(ids));
    const userMap = await this.getUserMap(uniqueIds);
    return ids.map(id => userMap[id]);
  };

  private getUserMap = async (ids: string[]) => {
    const userMap: { [key: string]: User } = {};
    const idsToMatch = new Set(ids);
    this.users.forEach(user => {
      if (idsToMatch.has(user._id)) userMap[user._id] = user;
    });
    this.log(LogLevel.SILLY)(`Getting users [${ids.join(', ')}]`);
    await delay(200);
    return userMap;
  };
}
