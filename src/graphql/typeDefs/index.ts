import path from 'path';
import { gql } from 'apollo-server-core';
import { constructSchemaFromFiles } from '../utils/loadGraphQLSchema';
import findFilesInDirectory from '../utils/findFilesInDirectory';

/**
 * Generate the Type definitions for the server by
 * stitching a schema together from .graphql files.
 *
 * @param env the current server environment (UNUSED)
 */
const generateTypeDefs = (env: string) => {
  // Load .graphql files from the `schemas` directory
  const gqlFiles = findFilesInDirectory(
    path.join(__dirname, 'schemas'),
    /\.graphql/,
  );

  // Stitch each .graphql file together into a single schema string
  const schema = constructSchemaFromFiles(gqlFiles);

  // Create the schema
  return gql(schema);
};

export default generateTypeDefs;
