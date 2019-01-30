import DataLoader from 'dataloader';

import { IService } from '../service/types';
import { User, UserInput } from '../../graphql/typeDefs/models/User';
import { LoggerLevelOutputFn } from '../LoggingService';

export interface ExampleServiceConfiguration {
  logger?: LoggerLevelOutputFn;
  getUserData(): User[];
}

export interface IExampleService extends IService<ExampleServiceConfiguration> {
  getLoader(): DataLoader<string, User>;
  getUser(id: string): Promise<User>;
  getUsers(limit?: number): Promise<User[]>;
  loadUser(id: string): Promise<User>;
  loadUsers(ids: string[]): Promise<User[]>;
  addUser(user: UserInput): Promise<User>;
  deleteUser(id: string): Promise<User[]>;
}
