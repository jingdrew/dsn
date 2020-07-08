import { db, pgp } from '../db/db.config';

exports.findAll = () => {
  const query = 'SELECT * FROM USERS';
  return db.any(query);
};

exports.findByUsername = (username) => {
  const query = pgp.as.format(
    'SELECT * FROM users WHERE username = ${username}',
    { username: username }
  );
  return db.oneOrNone(query);
};

exports.createUser = (user) => {
  const query = pgp.as.format(
    'INSERT INTO users(username, password, created, updated)' +
      'VALUES(${username}, ${password}, ${created}, ${updated})',
    {
      username: user.username,
      password: user.password,
      created: user.created,
      updated: user.updated,
    }
  );
  return db.query(query);
};
