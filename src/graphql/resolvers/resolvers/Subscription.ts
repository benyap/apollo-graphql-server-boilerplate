// This resolver file was scaffolded by github.com/prisma/graphqlgen.

import { SubscriptionResolvers } from '../../types';
import { pubSub, SubscriptionTopic } from '../../pubsub';

export const Subscription: SubscriptionResolvers.Type = {
  ...SubscriptionResolvers.defaultResolvers,
  newUser: {
    subscribe: (parent, args, ctx) => {
      return pubSub.asyncIterator(SubscriptionTopic.EXAMPLE);
    },
  },
};
