import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import dotEnv from 'dotenv';
import { schema, root } from './api/schema';
import { defaultSchema } from './graphql/index';

dotEnv.config();
const app = express();

app.use(express.json());

app.use(process.env.GRAPHQL_PATH!, graphqlHTTP((request, response, graphQLParams) => ( {
    schema: defaultSchema,
    graphiql: true,
    context: {
        req: request,
        res: response
    }
} )));

app.get('/', (req, res) => {
    return res.json('asdasdas');
});

console.log('here');
app.listen(process.env.SERVER_PORT);
console.log('Up and running');
