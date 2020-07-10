import ResultModel from '../model/result.model';
import UserEntity from '../entity/user.entity';
import DatabaseHelper from '../helper/database.helper';

class UserService {
    static async register(user: UserEntity): Promise<ResultModel<UserEntity>> {
        try {
            const db = new DatabaseHelper<UserEntity>(UserEntity);
            if (await db.save(user))
                return new ResultModel<UserEntity>(user, 201);
            return new ResultModel<UserEntity>(new Error('Registration failed'), 500);
        } catch (err) {
            return new ResultModel<UserEntity>(new Error(err.message ?? "Unknown error occurred."), 500);
        }
    }
}

export default UserService;