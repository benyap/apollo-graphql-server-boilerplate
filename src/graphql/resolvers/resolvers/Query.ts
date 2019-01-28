// This resolver file was scaffolded by github.com/prisma/graphqlgen.

import { QueryResolvers } from '../../types';
import { EServiceName } from '../../../services/service/enums';
import { IExampleService } from '../../../example/types';

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
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
  serverDiagnostics: (parent, args, ctx) => {
    return ctx.diagnostics;
  },
};
