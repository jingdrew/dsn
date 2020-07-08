import userResolver from './user/resolver';
import productResolver from './product/resolver';
import { userSchema } from './user/schema';
import { productSchema } from './product/schema';
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';

const schemas = [
    makeExecutableSchema({typeDefs: userSchema, resolvers: userResolver}),
    makeExecutableSchema({typeDefs: productSchema, resolvers: productResolver}),
]

export const defaultSchema = mergeSchemas({schemas: schemas });


