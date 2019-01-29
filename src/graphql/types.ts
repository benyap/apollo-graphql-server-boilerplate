// Code generated by github.com/prisma/graphqlgen, DO NOT EDIT.

import { GraphQLResolveInfo } from 'graphql';
import { ServerDiagnostics } from './typeDefs/models/ServerDiagnostics.d';
import { User } from './typeDefs/models/User.d';
import { GraphQLContext } from '../services/ContextCreatorService/types.d';

export type ServerEnvironment = 'production' | 'qat' | 'development' | 'local';

export namespace QueryResolvers {
  export const defaultResolvers = {};

  export interface ArgsUser {
    id: string;
  }

  export interface ArgsUsers {
    limit?: number | null;
  }

  export type ServerDiagnosticsResolver = (
    parent: undefined,
    args: {},
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => ServerDiagnostics | Promise<ServerDiagnostics>;

  export type UserResolver = (
    parent: undefined,
    args: ArgsUser,
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => User | null | Promise<User | null>;

  export type UsersResolver = (
    parent: undefined,
    args: ArgsUsers,
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => Array<User | null> | null | Promise<Array<User | null> | null>;

  export type ExpensiveUsersResolver = (
    parent: undefined,
    args: {},
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => Array<User | null> | null | Promise<Array<User | null> | null>;

  export interface Type {
    serverDiagnostics(
      parent: undefined,
      args: {},
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): ServerDiagnostics | Promise<ServerDiagnostics>;

    user(
      parent: undefined,
      args: ArgsUser,
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): User | null | Promise<User | null>;

    users(
      parent: undefined,
      args: ArgsUsers,
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): Array<User | null> | null | Promise<Array<User | null> | null>;

    expensiveUsers(
      parent: undefined,
      args: {},
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): Array<User | null> | null | Promise<Array<User | null> | null>;
  }
}

export namespace ServerDiagnosticsResolvers {
  export const defaultResolvers = {
    version: (parent: ServerDiagnostics) => parent.version,
    startDate: (parent: ServerDiagnostics) => parent.startDate,
  };

  export type VersionResolver = (
    parent: ServerDiagnostics,
    args: {},
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type StartDateResolver = (
    parent: ServerDiagnostics,
    args: {},
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => Date | Promise<Date>;

  export interface Type {
    version(
      parent: ServerDiagnostics,
      args: {},
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): string | Promise<string>;

    startDate(
      parent: ServerDiagnostics,
      args: {},
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): Date | Promise<Date>;
  }
}

export namespace UserResolvers {
  export const defaultResolvers = {
    _id: (parent: User) => parent._id,
    firstname: (parent: User) =>
      parent.firstname === undefined ? null : parent.firstname,
    lastname: (parent: User) =>
      parent.lastname === undefined ? null : parent.lastname,
  };

  export type _idResolver = (
    parent: User,
    args: {},
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>;

  export type FirstnameResolver = (
    parent: User,
    args: {},
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>;

  export type LastnameResolver = (
    parent: User,
    args: {},
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>;

  export type FriendsResolver = (
    parent: User,
    args: {},
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => Array<User | null> | null | Promise<Array<User | null> | null>;

  export interface Type {
    _id(
      parent: User,
      args: {},
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): string | null | Promise<string | null>;

    firstname(
      parent: User,
      args: {},
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): string | null | Promise<string | null>;

    lastname(
      parent: User,
      args: {},
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): string | null | Promise<string | null>;

    friends(
      parent: User,
      args: {},
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): Array<User | null> | null | Promise<Array<User | null> | null>;
  }
}

export namespace MutationResolvers {
  export const defaultResolvers = {};

  export interface UserInput {
    firstname?: string | null;
    lastname?: string | null;
  }

  export interface ArgsAddUser {
    user: UserInput;
  }

  export interface ArgsDeleteUser {
    id: string;
  }

  export type AddUserResolver = (
    parent: undefined,
    args: ArgsAddUser,
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => User | null | Promise<User | null>;

  export type DeleteUserResolver = (
    parent: undefined,
    args: ArgsDeleteUser,
    ctx: GraphQLContext,
    info: GraphQLResolveInfo,
  ) => Array<User | null> | null | Promise<Array<User | null> | null>;

  export interface Type {
    addUser(
      parent: undefined,
      args: ArgsAddUser,
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): User | null | Promise<User | null>;

    deleteUser(
      parent: undefined,
      args: ArgsDeleteUser,
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): Array<User | null> | null | Promise<Array<User | null> | null>;
  }
}

export namespace SubscriptionResolvers {
  export const defaultResolvers = {};

  export interface NewUserResolver {
    subscribe(
      parent: undefined,
      args: {},
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): AsyncIterator<User | null> | Promise<AsyncIterator<User | null>>;
    resolve?(
      parent: undefined,
      args: {},
      ctx: GraphQLContext,
      info: GraphQLResolveInfo,
    ): User | null | Promise<User | null>;
  }

  export interface Type {
    newUser: {
      subscribe(
        parent: undefined,
        args: {},
        ctx: GraphQLContext,
        info: GraphQLResolveInfo,
      ): AsyncIterator<User | null> | Promise<AsyncIterator<User | null>>;
      resolve?(
        parent: undefined,
        args: {},
        ctx: GraphQLContext,
        info: GraphQLResolveInfo,
      ): User | null | Promise<User | null>;
    };
  }
}

export interface Resolvers {
  Query: QueryResolvers.Type;
  ServerDiagnostics: ServerDiagnosticsResolvers.Type;
  User: UserResolvers.Type;
  Mutation: MutationResolvers.Type;
  Subscription: SubscriptionResolvers.Type;
}
