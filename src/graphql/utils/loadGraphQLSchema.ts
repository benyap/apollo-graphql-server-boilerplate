import fs from 'fs';

/**
 * This function will read the contents of a file
 * at the given path and return it as a string.
 *
 * @param path the path to read the file from
 * @returns the contents of the file as a string
 */
const readFileAtPath = (path: string) => {
  try {
    return fs.readFileSync(path, 'utf8').toString();
  } catch (error) {
    throw new Error(`Failed to read file at ${path} - ${error.message}`);
  }
};

/**
 * This function will read a list of .graphql files
 * and combine them together to create a GraphQL schema.
 *
 * @param paths a list of paths to load .graphql files from
 * @returns the schema as a single string
 */
const constructSchemaFromFiles = (paths: string[]) => {
  const schemas = paths.map(file => readFileAtPath(file));

  // Replace first type definition extension with base type
  // FIXME: this is necessary due to current system not supporting extension of non-existent types.
  // See https://github.com/graphql/graphql-js/issues/913.
  return schemas
    .join('\n')
    .replace('extend type Query', 'type Query')
    .replace('extend type Mutation', 'type Mutation')
    .replace('extend type Subscription', 'type Subscription');
};

/**
 * This function will read a GraphQL schema and combine all
 * extended root fields (Query, Mutation and Subscription)
 * into one definition.
 *
 * i.e. all queries in an `extend type Query` block will be
 * merged with the first `type Query` definition.
 *
 * @param string the schema as a string
 * @returns the modified schema as a single string
 */
const mergeRootFields = (schema: string) => {
  let schemaResult = schema;

  ['Query', 'Mutation', 'Subscription'].forEach(type => {
    // Match all fields inside `extend type TYPE` blocks
    const matches = schema.match(
      new RegExp(
        `(?<=extend type ${type} {\\n)((?: |\\w|:|\\n|\\(|\\)|\\[|\\]|!|#|,)*)`,
        'g',
      ),
    );

    if (matches) {
      // Remove all `extend type TYPE` blocks
      schemaResult = schemaResult.replace(
        new RegExp(
          `(extend type ${type} {\\n(?: |\\w|:|\\n|\\(|\\)|\\[|\\]|!|#|,)*}\\n\\n)`,
          'g',
        ),
        '',
      );

      // Push fields inside `extend type TYPE` blocks into the root Query block
      schemaResult = schemaResult.replace(
        new RegExp(
          `(?<!extend )(type ${type} {\\n)((?: |\\w|:|\\n|\\(|\\)|\\[|\\]|!|#)*)(\\n)(}\\n)`,
          'g',
        ),
        `$1$2$3\n${matches.join('\n')}$4`,
      );
    }
  });

  return schemaResult;
};

export { readFileAtPath, constructSchemaFromFiles, mergeRootFields };
