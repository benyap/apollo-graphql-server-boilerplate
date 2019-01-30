import LogDirective from './LogDirective';

/**
 * Generate the schema directive definitions for the server.
 *
 * @param env the current server environment (UNUSED)
 */
const generateSchemaDirectives = (env: string) => ({
  log: LogDirective,
});

export default generateSchemaDirectives;
