# Apollo Server 2.0

> TODO: needs more documentation

## Modular schemas

Using Apollo Server 2.0 allows us to modularly define our schema. Each
GraphQL type can defined in a `.graphql` file in the `src/graphql/typeDefs/schemas`
directory by extending the root types (`Query`, `Mutation` and `Subscription`):

```
## User.graphql ##

type User {
  _id: ID
  firstname: String
  lastname: String
  friends: [User]
}

extend type Query {
  # Get a user by their id
  user(id: ID!): User
}
```

Scripts in `src/graphql/utils` will automatically stitch `.graphql` files in the
`src/graphql/typeDefs/schema` directory together when the server starts.

## Schema Directives

Custom [schema directives](https://www.apollographql.com/docs/graphql-tools/schema-directives.html)
can be defined and added to the schema by adding its definition to the file
`src/graphql/typeDefs/schemas/Directives.graphql` and adding its resolver to
`src/graphql/schemaDirectives/index.ts`.
