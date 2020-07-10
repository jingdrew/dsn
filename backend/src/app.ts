import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import dotEnv from 'dotenv';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typedef';
import resolvers from './resolver';

dotEnv.config();

const app = express();
const prefix = process.env.GRAPHQL_PATH ?? '/graphql';
const port = process.env.SERVER_PORT ?? 4000;
const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });

app.use(express.json());

app.use(prefix, graphqlHTTP((request, response) => ( {
    schema: schema,
    graphiql: true,
    context: {
        req: request,
        res: response
    }
} )));

app.listen(port, () => {
    console.log(`🚀 Server up and running at http://localhost:${port}${prefix}`);

});
