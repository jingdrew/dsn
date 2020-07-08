import { db, pgp } from '../db/db.config';

exports.findByUsername = (username) => {
  const query = pgp.as.format(
    'SELECT * FROM users WHERE username = ${username}',
    { username: username }
  );
  return db.oneOrNone(query);
};

exports.createUser = (user) => {
  const query = pgp.as.format(
    'INSERT INTO users(firstname, lastname, email, username, password, created, updated)' +
      'VALUES(${firstname}, ${lastname}, ${email}, ${username}, ${password}, ${created}, ${updated})' +
      'RETURNING firstname, lastname, email, username, created, updated',
    {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      password: user.password,
      created: user.created,
      updated: user.updated,
    }
  );
  return db.query(query);
};
