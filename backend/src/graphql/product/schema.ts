import { buildSchema } from 'graphql';

export const productSchema = `
    type Query {
        product(name: String!): Product
    }
    type Product {
        key: ID
        value: String
    }
`;