import dotEnv from 'dotenv';
import jwt from 'jsonwebtoken';

dotEnv.config();

const generateToken = (username) => {
  return jwt.sign(username, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN_DAYS,
    algorithm: 'HS512',
  });
};

module.exports = { generateToken };
