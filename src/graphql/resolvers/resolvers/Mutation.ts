// This resolver file was scaffolded by github.com/prisma/graphqlgen.

import { MutationResolvers } from '../../types';
import { IExampleService } from '../../../example/types';
import { EServiceName } from '../../../services/service/enums';
import { pubSub, SubscriptionTopic } from '../../pubsub';

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  addUser: (parent, args, ctx) => {
    const example: IExampleService = ctx.serviceLibrary.getService<
      IExampleService
    >(EServiceName.ExampleService);
    const newUser = example.addUser(args.user);
    pubSub
      .publish(SubscriptionTopic.EXAMPLE, { newUser })
      // FIXME: normally you would use a LoggingService here to capture the error
      .catch();
    return newUser;
  },
  deleteUser: (parent, args, ctx) => {
    const example: IExampleService = ctx.serviceLibrary.getService<
      IExampleService
    >(EServiceName.ExampleService);
    example.deleteUser(args.id);
    return example.getUsers();
  },
};
