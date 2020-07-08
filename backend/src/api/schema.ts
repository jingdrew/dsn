import { Request, Response } from 'express';
import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    type Query {
        profile(ukey: String!): Profile
    }
    type Mutation {
        register(email: String!, password: String!, confirmation: String!): RegisteredUser
        login(email: String!, password: String!): AccessToken
        confirm(email: String!): Boolean
    }
    type Profile {
        ukey: ID
        email: String
    }
    type RegisteredUser {
        ukey: ID
        tmp_confirm_token: ID
    }
    type AccessToken {
        ukey: ID
        access_token: ID
    }
`);

export const root = {
    register: async ({ email, password, confirmation }: { email: string, password: string, confirmation: string }, context: any) => {
        return { ukey: 'userKey', tmp_confirm_token: 'tmpConfirmToken' };
    },
    confirm: async ({ email }: { email: string }, context: any) => {
        return true;
    },
    login: async ({ email, password }: { email: string, password: string }, context: any) => {
        return { ukey: 'ukey', access_token: 'AccessToken' };
    },
    profile: async ({ ukey }: { ukey: string }, context: any) => {
        return { ukey: 'ukey', email: 'email' };
    }
};