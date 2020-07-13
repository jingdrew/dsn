import 'dotenv/config';
import { MiddlewareFn } from 'type-graphql';
import { ContextHelper } from '../helper/context.helper';
import { verify } from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';
import { parseCode } from '../helper/code.helper';

export const IsAuthorized: MiddlewareFn<ContextHelper> = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
        throw new ApolloError('Not authorized.', parseCode(401));
    }
    try {
        const token = authorization.substring(7);
        verify(token, process.env.ACCESS_TOKEN_SECRET!);
    } catch (err) {
        throw new ApolloError('Not authorized.', parseCode(401));
    }
    return next();
};
