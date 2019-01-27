import { PubSub } from 'apollo-server-express';

/**
 * Publisher Subcriber implementation provided by Apollo Server.
 * All subscriptions should be passed through this PubSub instance.
 */
const pubSub = new PubSub();

/**
 * Add subscriptions topics to this enum.
 */
enum SubscriptionTopic {
  EXAMPLE = 'example',
}

export { pubSub, SubscriptionTopic };
