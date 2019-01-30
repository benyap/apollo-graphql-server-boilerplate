import DataLoader from 'dataloader';

import { AbstractService } from '../service/AbstractService';
import { IExampleService, ExampleServiceConfiguration } from './types';
import { EServiceName } from '../service/enums';

import { UserInput, User } from '../../graphql/typeDefs/models/User';
import { LogLevel, LoggingService } from '../LoggingService';

import { delay } from './utils';

/**
 * This is an example service which provides methods to
 * query and mutate a sample data set.
 */
export class ExampleService extends AbstractService<ExampleServiceConfiguration>
  implements IExampleService {
  private idCount: number;
  private loader: DataLoader<string, User>;
  private getUserData: () => User[];

  constructor() {
    super(EServiceName.ExampleService, 'ExampleService');
  }

  public init = async (config: ExampleServiceConfiguration) => {
    this.log = config.logger || LoggingService.void;
    this.getUserData = config.getUserData;
    this.idCount = this.getUserData().length + 1;
    this.log(LogLevel.DEBUG)('Example service initialised.');
  };

  public newContext = () => {
    this.loader = new DataLoader<string, User>(this.batchLoadUsers);
    this.log(LogLevel.SILLY)(`Created new DataLoader`);
  };

  public getLoader = () => this.loader;

  public getUser = async (id: string) => {
    this.log(LogLevel.SILLY)(`Getting user ${id}`);
    await delay(200);
    return this.getUserData().filter(u => u._id === id)[0];
  };

  public getUsers = async (limit?: number) => {
    this.log(LogLevel.SILLY)(`Getting users (bulk)`);
    await delay(200);
    if (limit === undefined) return this.getUserData();
    return this.getUserData().slice(0, limit);
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
    this.getUserData().push(newUser);
    return newUser;
  };

  public deleteUser = async (id: string) => {
    let removeIndex = -1;
    this.getUserData().forEach((user, idx) => {
      if (user._id === id) removeIndex = idx;
    });
    this.log(LogLevel.SILLY)(`Deleting user ${id}`);
    await delay(200);
    if (removeIndex > -1) this.getUserData().splice(removeIndex, 1);
    return this.getUserData();
  };

  private batchLoadUsers = async (ids: string[]) => {
    const uniqueIds = Array.from(new Set(ids));
    const userMap = await this.getUserMap(uniqueIds);
    return ids.map(id => userMap[id]);
  };

  private getUserMap = async (ids: string[]) => {
    const userMap: { [key: string]: User } = {};
    const idsToMatch = new Set(ids);
    this.getUserData().forEach(user => {
      if (idsToMatch.has(user._id)) userMap[user._id] = user;
    });
    this.log(LogLevel.SILLY)(`Getting users [${ids.join(', ')}]`);
    await delay(200);
    return userMap;
  };
}
