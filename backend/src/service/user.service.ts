import Result from '../model/result.model';
import UserEntity from '../entity/user.entity';
import DatabaseHelper from '../helper/database.helper';
import { compare, hash } from 'bcryptjs';

class UserService {
    static register = async (user: UserEntity): Promise<Result<UserEntity>> => {
        try {
            user.password = await hash(user.password, 12);
            const db = new DatabaseHelper<UserEntity>(UserEntity);
            if (await db.save(user))
                return new Result<UserEntity>(user);
            return new Result<UserEntity>(new Error('Unknown error occurred'));
        } catch (err) {
            return new Result<UserEntity>(new Error(err.detail ?? 'Unknown error occurred.'));
        }
    };


    static authenticate = async (username: string, password: string) => {
        try {
            const db = new DatabaseHelper<UserEntity>(UserEntity);
            const user = await db.get({ username });
            if (user) {
                if (await compare(password, user.password)) {
                }
                return new Result<UserEntity>(new Error('Bad credentials, wrong username or password.'));
            }
            return new Result<UserEntity>(new Error('Bad credentials, user not found.'));
        } catch (err) {
            return new Result<UserEntity>(new Error(err.detail ?? 'Unknown error occurred.'));
        }
    };

    static findUserByUsername = async (username: string) => {

    };
}

export default UserService;