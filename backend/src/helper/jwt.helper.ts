import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import Result from '../model/result.model';
import { User } from '../entity/user.entity';

export const generateAccessToken = async (user: User) => {
    try {
        const token = sign(
            { uid: user.username },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME });
        user.token = token;
        await user.save();
        return new Result<string>(token, '200');
    } catch (e) {
        return new Result<Error>(new Error(e.details ?? 'Error generating token.'), e.code ?? '500');
    }

};

export const validateToken = (token: string) => {
    try {
        return verify(token, process.env.ACCESS_TOKEN_SECRET!);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}
