import dotEnv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './type';
import resolvers from './resolver';

dotEnv.config();


export const schema = makeExecutableSchema({
        typeDefs: typeDefs,
        resolvers: resolvers
    }
);
const server = new ApolloServer({ schema });

const app = express();
server.applyMiddleware({ app: app, path: process.env.API_PREFIX });

const port = process.env.SERVER_PORT;

app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);