import db from '../db/db.config';
import repo from '../repository/user.repository';

export const getAllUsers = (req, res) => {
  repo
    .findAll()
    .then((data) => {
      console.log(data);
      return res.json(data); // print data;
    })
    .catch((error) => {
      console.log('ERROR:', error); // print the error;
    });
};

export const getByUsername = (req, res) => {
  repo
    .findByUsername('jing')
    .then((data) => {
      return res.json(data); // print data;
    })
    .catch((error) => {
      console.log('ERROR:', error); // print the error;
    });
};

export const createUser = (req, res) => {
  repo
    .createUser({
      username: 'papanoe',
      password: '1234',
      created: new Date(),
      updated: new Date(),
    })
    .then((data) => {
      return res.json(data); // print data;
    })
    .catch((error) => {
      console.log('ERROR: aca', error.message);
      return res.json(error);
    });
};
