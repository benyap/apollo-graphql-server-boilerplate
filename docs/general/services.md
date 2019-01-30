# Services

This boilerplate utilises a service-oriented architecture.
Capabilities of the server should implement the Service interface,
defined in `src/services/service/AbstractService.ts`.

## Defining your own services

> TODO: add documentation here

## Provided services

The following services are provided in the boilerplate (along with tests):

### Service library

The service provides an interface to collect a group of services
together for easy access, providing a mechanism to provision a
dynamic set of services to any component of the server.

When the server is initialised, all available services should be
stored in the service library. This allows other parts of the server
to use the `getService()` method to retrieve the service they need.

### Logging service

This service provides a standard interface to log messages on the
server, and provides a mechanism to control where server logs are
output. Logs can be categorised and filtered using a configuration
file in two levels of granularity - `LogLevel` and `LogTopic`.

By default, log messages are sent to a console output which prints
to the terminal screen. Custom output channels can be added using
the `addOutput()` method, which gives the ability to do things such
as recording log messages to a database, or triggering a notification
system when certain types of log messages are received.

### Network service

This is a simple service that provides an interface to send network
requests (GET, POST, DELETE currently supported) to external URLs.

### Authentication service

This service provides the method `authenticate()` which authenticates
a token in a request. If a valid token is provided, it should return
the appropriate authorization information.

You will need to provide the authentication logic yourself.

### Cache service

This service provides an interface which caches data whilst the
server is online. One possible use case for this service is to
cache user permissions in-memory the first time they authenticate
so that subsequent requests from the same user does not request a
round-trip to other services (e.g. a database service) which could
take several seconds.

### Context Creator service

This service is made to work with Apollo Server's context. It calculates
a request's authorization (using the Authentication service) and provide
the appropriate services for use in the GraphQL resolvers.
