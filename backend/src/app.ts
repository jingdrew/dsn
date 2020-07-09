import dotEnv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './type';
import resolvers from './resolver';

dotEnv.config();

const app = express();
const port = process.env.SERVER_PORT;
const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
const server = new ApolloServer({ schema });

server.applyMiddleware({ app: app, path: process.env.API_PREFIX });

app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);




