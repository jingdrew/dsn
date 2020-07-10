import { validateAuthInput, validateSignUpInput } from '../validator/user.validator';
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
            if (result.getError()) {
                throw new Error(result.getError()!.message ?? 'Unexpected error occurred, sign up failed.');
            } else {
                return result.getData();
            }
        },
        authenticate: async (source: any, args: any) => {
            validateAuthInput(args.input);
            const result = await UserService.authenticate(args.input.username, args.input.password);
            if (result.getError()) {
                throw new Error(result.getError()!.message ?? 'Unexpected error occurred, failed to authenticate.');
            } else {
                return result.getData();
            }
        }
    }
};