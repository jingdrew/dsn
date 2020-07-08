import userRepository from '../repository/user.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

dotEnv.config();

export const authenticate = async (req, res) => {
  try {
    const user = await userRepository.findByUsername(req.body.username);
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        if (user.api_key) {
          return res.status(401).json({ error: 'Api key not null' });
        } else {
          console.log(process.env.JWT_SECRET);

          const token = jwt.sign(username, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE_IN_DAYS,
            algorithm: 'HS512',
          });
          console.log('asdasdasd');
          return res.json({ token: token });
        }
      } else {
        return res
          .status(401)
          .json({ error: 'Username and password did not match' });
      }
    } else {
      return res.status(401).json({ error: 'Bad credentials' });
    }
  } catch (error) {
    return res.json(error.detail);
  }
};

export const createUser = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: hash,
    created: new Date(),
    updated: new Date(),
  };

  userRepository
    .createUser(user)
    .then((data) => {
      return res.json(data[0]);
    })
    .catch((error) => {
      return res.status(400).json({ error: error.detail });
    });
};
