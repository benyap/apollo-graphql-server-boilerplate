import { IUserSubscriptions } from './types';
import { pubSub, SubscriptionTopic } from '../../../pubsub';
import { User } from '../../../typeDefs/models/User';

export const UserSubscriptions: IUserSubscriptions = {
  newUser: {
    subscribe: (parent, args, ctx) => {
      const it = pubSub.asyncIterator<User>(SubscriptionTopic.EXAMPLE);
      return it;
    },
  },
};
