import { IService } from '../services/service/types';
import { getIntrospectionQuery } from 'graphql';
import { User, UserInput } from '../graphql/typeDefs/models/User';

export interface IExampleService extends IService<{}> {
  getUser(id: string): Promise<User>;
  getUsers(limit?: number): Promise<User[]>;
  loadUser(id: string): Promise<User>;
  loadUsers(ids: string[]): Promise<User[]>;
  addUser(user: UserInput): Promise<User>;
  deleteUser(id: string): Promise<User[]>;
}
