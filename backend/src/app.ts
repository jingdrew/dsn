import 'dotenv/config';
import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import UserResolver from './resolver/user.resolver';
import ProductResolver from './resolver/product.resolver';

(
    async () => {
        const app = express();
        const serverPort = process.env.SERVER_PORT;
        const apiPath = process.env.API_APTH;

        const apolloServer = new ApolloServer({
            schema: await buildSchema({ resolvers: [UserResolver, ProductResolver] }),
            context: ({ req, res }) => ( { req, res } )
        });

        apolloServer.applyMiddleware({ app: app, path: apiPath, cors: false });

        app.listen(serverPort, () => {
            console.log(`🚀 Server up and running at http://localhost:${serverPort}${apiPath}`);
        });
    }
)();
