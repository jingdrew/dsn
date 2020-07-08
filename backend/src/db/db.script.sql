DROP DATABASE IF EXISTS dsn_db;

CREATE DATABASE dsn_db WITH 
  OWNER = jingdu 
  ENCODING = 'UTF8' 
  LC_COLLATE = 'C' 
  LC_CTYPE = 'C' 
  TABLESPACE = pg_default 
  CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  api_key TEXT,
  created TIMESTAMP DEFAULT NOW(),
  updated TIMESTAMP
);

