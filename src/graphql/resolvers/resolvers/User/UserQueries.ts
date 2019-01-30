import { IExampleService } from '../../../../services/ExampleService/types';
import { EServiceName } from '../../../../services/service/enums';
import { IUserQueries } from './types';

export const UserQueries: IUserQueries = {
  user: (parent, args, ctx) => {
    const example: IExampleService = ctx.lib.getService<IExampleService>(
      EServiceName.ExampleService,
    );
    return example.getUser(args.id);
  },
  users: (parent, args, ctx) => {
    const example: IExampleService = ctx.lib.getService<IExampleService>(
      EServiceName.ExampleService,
    );
    return example.getUsers(args.limit);
  },
  expensiveUsers: (parent, args, ctx) => {
    const example: IExampleService = ctx.lib.getService<IExampleService>(
      EServiceName.ExampleService,
    );
    return example.getUsers();
  },
};
