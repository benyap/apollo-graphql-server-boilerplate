// This resolver file was scaffolded by github.com/prisma/graphqlgen.

import { MutationResolvers } from '../../types';
import { IExampleService } from '../../../example/types';
import { EServiceName } from '../../../services/service/enums';
import { pubSub, SubscriptionTopic } from '../../pubsub';

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  addUser: async (parent, args, ctx) => {
    const example: IExampleService = ctx.lib.getService<IExampleService>(
      EServiceName.ExampleService,
    );
    const newUser = await example.addUser(args.user);
    pubSub
      .publish(SubscriptionTopic.EXAMPLE, { newUser })
      // FIXME: normally you would use a LoggingService here to capture the error
      .catch();
    return newUser;
  },
  deleteUser: async (parent, args, ctx) => {
    const example: IExampleService = ctx.lib.getService<IExampleService>(
      EServiceName.ExampleService,
    );
    await example.deleteUser(args.id);
    return example.getUsers();
  },
};
