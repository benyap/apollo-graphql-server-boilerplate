import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

import {
  constructSchemaFromFiles,
  mergeRootFields,
} from '../../src/graphql/utils/loadGraphQLSchema';
import findFilesInDirectory from '../../src/graphql/utils/findFilesInDirectory';

// tslint:disable:no-console
const log = console.log;

const SCHEMA_FILE_PATH = 'src/graphql/generated/schema.graphql';

log(chalk.blue(`Generating GraphQL schema.`));

// Load .gql files
log(chalk.dim(`Locating .graphql files...`));
const gqlFiles = findFilesInDirectory(
  path.join('src', 'graphql', 'typeDefs', 'schemas'),
  /\.graphql/,
);
log(
  chalk.dim(
    `Found ${gqlFiles.length} .graphql file${
      gqlFiles.length === 1 ? '' : 's'
    }.`,
  ),
);

log(chalk.dim(`Constructing schema...`));
const schema = constructSchemaFromFiles(gqlFiles);

log(chalk.dim(`Merging root fields...`));
const mergedSchema = mergeRootFields(schema);

if (!fs.existsSync('src/graphql/generated')) {
  log(chalk.dim(`Creating 'generated' directory...`));
  fs.mkdirSync('src/graphql/generated');
}

fs.writeFileSync(SCHEMA_FILE_PATH, mergedSchema);
log(chalk.dim(`Schema created at ${SCHEMA_FILE_PATH}.`));

log(chalk.green(`Finished generating GraphQL schema.`));
