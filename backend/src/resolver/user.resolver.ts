import UserService from '../service/user.service';
import { Arg, Mutation, Query } from 'type-graphql';
import { AuthInput, Token, User, UserInput } from '../typedef/user.typedef';
import { validateOrReject } from 'class-validator';
import { ApolloError } from 'apollo-server-express';

class UserResolver {

    @Query(() => User)
    async user() {
        return ( { username: 'Jing', password: 'Du' } );
    };

    @Mutation(() => User)
    async signUp(@Arg('input') input: UserInput) {
        await validateOrReject(input);
        const result = await UserService.register(input);
        if (result.getError()) {
            throw new ApolloError(result.getError()!.message, result.code);
        } else {
            return result.getData();
        }
    };

    @Mutation(() => Token)
    async authenticate(@Arg('input') input: AuthInput) {
        await validateOrReject(input);
        const result = await UserService.authenticate(input.username!, input.password!);
        if (result.getError()) {
            throw new ApolloError(result.getError()!.message, result.code);
        } else {
            return { token: result.getData() };
        }
    };
}

export default UserResolver;