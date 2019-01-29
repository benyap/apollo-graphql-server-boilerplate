import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import * as sh from 'shelljs';

import {
  constructSchemaFromFiles,
  mergeRootFields,
} from '../../src/graphql/utils/loadGraphQLSchema';
import findFilesInDirectory from '../../src/graphql/utils/findFilesInDirectory';

import generateCostMapTypes from './generate-cost-map-types';

// tslint:disable:no-console
const log = console.log;

const SCHEMA_FILE_PATH = 'src/graphql/generated/schema.graphql';
const TYPES_FILE_PATH = 'src/graphql/types.ts';

/**
 * Generate Typescript definitions for the server using
 * `graphqlgen` by inspecting the GraphQL schema.
 *
 * Running this script will generate a `types.ts` file
 * containig type definitions for all root fields and
 * model types, which can be imported directly. Additionally,
 * scaffolding for how to set up resolvers are generated
 * in the `src/graphql/generated/resolvers` directory for
 * reference. DO NOT COPY these files directly into your
 * project, but rather use them as a guide on how to lay
 * out your resolvers.
 */
const generateSchemaAndTypes = () => {
  log(chalk.blue(`Generating GraphQL schema...`));

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
  log(chalk.blue(`Schema created at ${SCHEMA_FILE_PATH}.`));

  if (fs.existsSync(TYPES_FILE_PATH)) {
    log(chalk.dim(`Backing up types.ts at '${TYPES_FILE_PATH}.old'...`));
    fs.copyFileSync(TYPES_FILE_PATH, `${TYPES_FILE_PATH}.old`);
  }

  log(chalk.dim(`Generating types using graphqlgen...`));
  sh.exec(`graphqlgen`);

  log(chalk.dim('Linting generated files...'));
  sh.exec(`yarn lint:tslint:fix src/graphql/types.ts --force`);
  sh.exec(`yarn prettify src/graphql/types.ts`);

  log(chalk.dim('Generating cost map types...'));
  generateCostMapTypes();

  log(chalk.green(`\nGeneration finished successfully.`));
};

generateSchemaAndTypes();
