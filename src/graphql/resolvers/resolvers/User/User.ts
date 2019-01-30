// This resolver file was scaffolded by github.com/prisma/graphqlgen.

import { UserResolvers } from '../../../types';
import { User as UserModel } from '../../../typeDefs/models/User';
import { IExampleService } from '../../../../services/ExampleService/types';
import { EServiceName } from '../../../../services/service/enums';

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  friends: async (parent, args, ctx) => {
    const example: IExampleService = ctx.lib.getService<IExampleService>(
      EServiceName.ExampleService,
    );
    const friends: UserModel[] = await example.loadUsers(parent.friendIds);
    return friends;
  },
};
