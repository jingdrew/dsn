import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import apiV1 from './route/api.v1';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(apiV1);

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is up and running');
});
