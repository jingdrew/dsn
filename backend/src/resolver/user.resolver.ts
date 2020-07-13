import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { AuthInput, Token, UserInput } from '../typedef/user.typedef';
import { validateOrReject } from 'class-validator';
import { ApolloError } from 'apollo-server-express';
import { User } from '../entity/user.entity';
import { compare, hash } from 'bcryptjs';
import { generateAccessToken, validateToken } from '../helper/jwt.helper';
import { parseCode } from '../helper/code.helper';

@Resolver()
export class UserResolver {

    @Mutation(() => User)
    async signUp(@Arg('input') input: UserInput) {
        try {
            await validateOrReject(input);
            const hashedPassword = await hash(input.password!, 12);
            const user = new User(input.username!, hashedPassword, input.firstName!, input.lastName!, input.email!);
            if (await user.save())
                return user;
            return new ApolloError('Unknown error occurred', parseCode(500));
        } catch (e) {
            return new ApolloError(e.detail ?? 'Unknown error occurred.', e.code ?? parseCode(500));
        }
    };

    @Mutation(() => Token)
    async authenticate(@Arg('input') input: AuthInput) {
        try {
            await validateOrReject(input);
            const user = await User.findOne({ username: input.username });
            if (user) {
                if (await compare(input.password!, user.password)) {
                    if (validateToken(user.token)) {
                        return { token: user.token };
                    }
                    const result = await generateAccessToken(user);
                    if (result.getError()) {
                        return new ApolloError(result.getError()!.message, result.code);
                    } else {
                        return { token: result.data };
                    }
                }
                return new ApolloError('Bad credentials, wrong username or password.', parseCode(400));
            }
            return new ApolloError('Bad credentials, user not found.', parseCode(400));
        } catch (e) {
            return new ApolloError(e.detail ?? 'Unknown error occurred.', e.code ?? parseCode(500));
        }
    };
}