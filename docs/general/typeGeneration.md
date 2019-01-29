# Automatic type generation

> TODO: needs more documentation

This boilerplate uses [`graphqlgen`](https://github.com/prisma/graphqlgen)
by Prisma to generate Typescript definitions from your GraphQL schema.

## Configuration

Configuration is found in the `graphqlgen.yml` file in the root directory
of the project.

A **model definition** defines the shape the raw data from the server takes.
These are defined in `.d.ts` files located in the `src/graphql/typeDefs/models`
directory. `graphqlgen` will use these definitions and your GraphQL schema to
determine which fields can use default resolvers and which fields require custom
resolvers.

All model definition files should also be added to the `models > files` section
of the `graphqlgen.yml` configuration file.

## How to generate types

Use this command to generate Typescript types from your schema

```bash
yarn graphql:generate
```

This will update the type definitions in `src/graphql/types.ts` and provide
scaffolding templates for the resolvers in `src/graphql/generated` using
your `.graphql` files and model definitions.

Do not directly use the scaffolding templates - files in the `generated`
directory are not version controlled. Instead, you should copy the templates
from the generated files to use to write your own resolvers, in the
`src/graphql/resolvers/resolvers` directory.
