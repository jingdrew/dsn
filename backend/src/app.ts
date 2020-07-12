import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import GraphQLSchema from './resolver'

createConnection().then(async () => {

    const app = express();
    const serverPort = process.env.SERVER_PORT ?? 4000;
    const apiPath = process.env.GRAPHQL_PATH ?? '/graphql';

    const apolloServer = new ApolloServer({
        schema: GraphQLSchema,
        context: ({ req, res }) => ( { req, res } )
    });

    apolloServer.applyMiddleware({ app: app, path: apiPath, cors: false });

    app.listen(serverPort, () => {
        console.log(`🚀 Server up and running at http://localhost:${serverPort}${apiPath}`);
    });
}).catch((err) => console.log('Error connecting to database : ' + err.message));


