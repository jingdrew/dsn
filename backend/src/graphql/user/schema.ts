import { buildSchema } from 'graphql';

export const userSchema = `
    type Query {
        user(email: String!, password: String!): Profile
    }
    type Profile {
        key: ID
        value: String
    }
`;