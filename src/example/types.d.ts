import { IService } from '../services/service/types';
import { getIntrospectionQuery } from 'graphql';
import { User, UserInput } from '../graphql/typeDefs/models/User';

export interface IExampleService extends IService<{}> {
  getUser(id: string): User;
  getUsers(limit?: number): User[];
  addUser(user: UserInput): User;
  deleteUser(id: string): User[];
}
