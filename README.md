# Apollo GraphQL Server Boilerplate

<div align="center"><strong>⚠️ WIP: This project is currently a work in progress. Features may be missing or incomplete.</strong></div>

<br/>

<div align="center">
  <!-- Dependency status -->
  <a href="https://david-dm.org/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://david-dm.org/bwyap/apollo-graphql-server-boilerplate.svg" alt="Dependency status" />
  </a>
  <!-- devDependency status -->
  <a href="https://david-dm.org/bwyap/apollo-graphql-server-boilerplate#info=devDependencies">
    <img src="https://david-dm.org/bwyap/apollo-graphql-server-boilerplate/dev-status.svg" alt="devDependency status" />
  </a>
  <!-- Known vulnerabilities -->
  <a href="https://snyk.io/test/github/bwyap/apollo-graphql-server-boilerplate?targetFile=package.json">
    <img src="https://snyk.io/test/github/bwyap/apollo-graphql-server-boilerplate/badge.svg?targetFile=package.json" alt="Known vulnerabilities" style="max-width:100%;" />
  </a>
  <!-- Code size -->
  <img src="https://img.shields.io/github/languages/code-size/bwyap/apollo-graphql-server-boilerplate.svg" alt="Code size" />
  
  <!-- License -->
  <a href="https://github.com/bwyap/apollo-graphql-server-boilerplate/blob/master/LICENSE.md">
    <img src="https://img.shields.io/github/license/bwyap/apollo-graphql-server-boilerplate.svg" alt="License" />
  </a>
</div>
<div align="center">
  <!-- Test Coverage - Coveralls -->
  <a href="https://coveralls.io/r/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://coveralls.io/repos/github/bwyap/apollo-graphql-server-boilerplate/badge.svg" alt="Test coverage (Coveralls)" />
  </a>
  <!-- Test Coverage - Codecov -->
  <a href="https://codecov.io/gh/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://codecov.io/gh/bwyap/apollo-graphql-server-boilerplate/branch/master/graph/badge.svg" alt="Test coverage (Codecov)" />
  </a>
  <!-- Tests - Appveyor -->
  <a href="https://ci.appveyor.com/project/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://img.shields.io/appveyor/tests/bwyap/apollo-graphql-server-boilerplate.svg" alt="Build status (Appveyor)" />
  </a>
  <!-- Build Status - Travis CI -->
  <a href="https://travis-ci.org/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://travis-ci.org/bwyap/apollo-graphql-server-boilerplate.svg?branch=master" alt="Build status (Travis CI)" />
  </a>
  <!-- Build Status - Appveyor -->
  <a href="https://ci.appveyor.com/project/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://ci.appveyor.com/api/projects/status/ywk6wlvw2mby5b3x?svg=true" alt="Build status (Appveyor)" />
  </a>
  <!-- Build Status - CircleCI -->
  <a href="https://circleci.com/gh/bwyap/apollo-graphql-server-boilerplate">
    <img src="https://img.shields.io/circleci/project/github/bwyap/apollo-graphql-server-boilerplate.svg?logo=CircleCI" alt="Build status (Circle CI)" />
  </a>
</div>

<div align="center">
  <sub>Created by by <a href="https://github.com/bwyap">Ben Yap</a>.</sub>
</div>

---

_An opinionated GraphQL server stack, written in Typescript._

This server boilerplate provides the scaffolding for building a
service-oriented production-ready GraphQL server, built on top of
Apollo Server 2.0 with Express integration.

### Services

This boilerplate utilises a service-oriented architecture.
Capabilities of the server should be defined using the Service
interface, defined in `src/services/service/AbstractService.ts`.
The following services are provided:

#### Service library

The service provides an interface to collect a group of services
together for easy access, providing a mechanism to provision a
dynamic set of services to any component of the server.

When the server is initialised, all available services should be
stored in the service library. This allows other parts of the server
to use the `getService()` method to retrieve the service they need.

#### Logging service

This service provides a standard interface to log messages on the
server, and provides a mechanism to control where server logs are
output. Logs can be categorised and filtered using a configuration
file in two levels of granularity - `LogLevel` and `LogTopic`.

By default, log messages are sent to a console output which prints
to the terminal screen. Custom output channels can be added using
the `addOutput()` method, which gives the ability to do things such
as recording log messages to a database, or triggering a notification
system when certain types of log messages are received.

#### Network service

This is a simple service that provides an interface to send network
requests (GET, POST, DELETE currently supported) to external URLs.

#### Authentication service

This service provides the method `authenticate()` which authenticates
a token in a request. If a valid token is provided, it should return
the appropriate authorization information.

You will need to provide the authentication logic yourself.

#### Cache service

This service provides an interface which caches data whilst the
server is online. One possible use case for this service is to
cache user permissions in-memory the first time they authenticate
so that subsequent requests from the same user does not request a
round-trip to other services (e.g. a database service) which could
take several seconds.

#### Context Creator service

This service is made to work with Apollo Server's context. It calculates
a request's authorization (using the Authentication service) and provide
the appropriate services for use in the GraphQL resolvers.

### Apollo Server 2.0

#### Modular schemas

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

#### Schema Directives

Custom [schema directives](https://www.apollographql.com/docs/graphql-tools/schema-directives.html)
can be defined and added to the schema by adding its definition to the file
`src/graphql/typeDefs/schemas/Directives.graphql` and adding its resolver to
`src/graphql/schemaDirectives/index.ts`.

### Automatic type generation

This boilerplate uses [`graphqlgen`](https://github.com/prisma/graphqlgen)
by Prisma to generate Typescript definitions from your GraphQL schema.

#### Configuration

Configuration is found in the `graphqlgen.yml` file in the root directory
of the project.

A **model definition** defines the shape the raw data from the server takes.
These are defined in `.d.ts` files located in the `src/graphql/typeDefs/models`
directory. `graphqlgen` will use these definitions and your GraphQL schema to
determine which fields can use default resolvers and which fields require custom
resolvers.

All model definition files should also be added to the `models > files` section
of the `graphqlgen.yml` configuration file.

#### How to generate types

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

---

## License

This project is licensed under the MIT license, Copyright (c) Ben Yap.
For more information see [`LICENSE.md`](https://github.com/bwyap/apollo-graphql-server-boilerplate/blob/master/LICENSE.md).
