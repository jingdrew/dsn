import bluebird from 'bluebird';
import pgPromise from 'pg-promise';
import dotEnv from 'dotenv';

dotEnv.config();

const initOptions = {
  promiseLib: bluebird,
};

const pgConfig = {
  host: process.env.PG_SERVER,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
  user: process.env.PG_USER,
};

const pgp = pgPromise(initOptions);

const db = pgp(pgConfig);

module.exports = { db, pgp };
