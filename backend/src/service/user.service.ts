import Result from '../model/result.model';
import UserEntity from '../entity/user.entity';
import DatabaseHelper from '../helper/database.helper';
import { compare, hash } from 'bcryptjs';
import { generateAccessToken } from '../helper/jwt.helper';

class UserService {
    static register = async (args: any): Promise<Result<UserEntity>> => {
        try {
            const hashedPassword = await hash(args.password, 12);
            const user = new UserEntity(args.username, hashedPassword, args.firstName, args.lastName, args.email);
            const db = new DatabaseHelper<UserEntity>(UserEntity);
            if (await db.save(user))
                return new Result<UserEntity>(user, 'SUCCESS');
            return new Result<UserEntity>(new Error('Unknown error occurred'), '500');
        } catch (err) {
            return new Result<UserEntity>(new Error(err.detail ?? 'Unknown error occurred.'), err.code ?? '500');
        }
    };


    static authenticate = async (username: string, password: string) => {
        try {
            const db = new DatabaseHelper<UserEntity>(UserEntity);
            const user = await db.get({ username });
            if (user) {
                if (await compare(password, user.password)) {
                    const token = generateAccessToken(user.username);
                    return new Result<string>(token, 'SUCCESS');
                }
                return new Result<UserEntity>(new Error('Bad credentials, wrong username or password.'), '400');
            }
            return new Result<UserEntity>(new Error('Bad credentials, user not found.'), '400');
        } catch (err) {
            return new Result<UserEntity>(new Error(err.detail ?? 'Unknown error occurred.'), err.code ?? '500');
        }
    };
}

export default UserService;