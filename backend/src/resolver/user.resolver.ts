import { signUpValidator } from '../validator/user.validator';
import Result from '../model/result';
import User from '../entity/user';

export default {
    Query: {
        user: () => ( { username: 'Jing', password: 'Du' } )
    },

    Mutation: {
        signUp: async (source: any, args: any): Promise<User> => {
            const result = await signUpValidator(args.input);
            if (result) {
                console.log(result.errors);
                return new Result<User>(new Error(result.errors[0]), 400);
            } else {
                return new Result<User>(new Error("sss"), 400);
            }
        }
    }
};