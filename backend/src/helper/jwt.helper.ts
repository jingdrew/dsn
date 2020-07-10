import 'dotenv/config';
import { sign } from 'jsonwebtoken';

export const generateAccessToken = (username: string) => {
    return sign(
        { uid: username },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME });
};
