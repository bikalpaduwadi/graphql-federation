import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';

import { resolvers } from './resolvers';
import { tasksApi } from './dummy-data/api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const typeDefs = gql(readFileSync(join(__dirname, './tasks.gql'), { encoding: 'utf-8' }));

const startApolloServer = async () => {
  // @ts-ignore
  const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });

  const port = 4002;
  const subgraphName = 'Tasks';

  try {
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {
            tasksApi,
          },
        };
      },
      listen: { port },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.log(err);
  }
};

startApolloServer();
