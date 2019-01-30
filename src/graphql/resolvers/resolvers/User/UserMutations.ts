import { IUserMutations } from './types';
import { IExampleService } from '../../../../services/ExampleService/types';
import { EServiceName } from '../../../../services/service/enums';
import { pubSub, SubscriptionTopic } from '../../../pubsub';

export const UserMutations: IUserMutations = {
  addUser: async (parent, args, ctx) => {
    const example: IExampleService = ctx.lib.getService<IExampleService>(
      EServiceName.ExampleService,
    );
    const newUser = await example.addUser(args.user);
    pubSub
      .publish(SubscriptionTopic.EXAMPLE, newUser)
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
