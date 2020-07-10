import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InputUser, User } from '../typedef/user.typedef';

@Resolver()
class UserResolver {

    @Query(() => User)
    async user() {
        return { username: 'Hola', password: 'K ase' };
    }

    @Mutation(() => User)
    async saveUser(@Arg('input') input: InputUser) {
        return { username: 'Hola', password: 'K ase' };
    }
}

export default UserResolver;