import { validateSignUpInput } from '../validator/user.validator';
import UserService from '../service/user.service';
import UserEntity from '../entity/user.entity';

export default {
    Query: {
        user: () => ( { username: 'Jing', password: 'Du' } )
    },

    Mutation: {
        signUp: async (source: any, args: any) => {
            validateSignUpInput(args.input);
            const user = new UserEntity(
                args.input.username,
                args.input.password,
                args.input.firstName,
                args.input.lastName,
                args.input.email
            );
            const result = await UserService.register(user);
            console.log(result);
            return new Error('Passed');
            //return { username: 'username', password: 'pass' };
        }
    }
};