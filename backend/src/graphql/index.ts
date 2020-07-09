import userSchema from './user/schema';
import productSchema from './product/schema';
import userResolver from './user/resolver';
import productResolver from './product/resolver';
import { mergeSchemas, mergeResolvers } from 'graphql-tools';

export const resolvers = mergeResolvers([userResolver, productResolver]);