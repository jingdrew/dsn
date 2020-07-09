import Database from '../helper/database';
import User from '../entity/user';

const UserService = () => {

    const findUserByUsername = async (username: string): Promise<User | undefined> => {
        const db = new Database<User>(User);
        return await db.get({ username });
    };

    const createUser = async (user: User) : Promise<User | undefined> => {
        const db = new Database<User>(User);
        return await db.save(user);
    }

};