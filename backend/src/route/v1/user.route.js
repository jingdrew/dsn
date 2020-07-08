import express from 'express';
import { createUser, authenticate } from '../../controller/user.controller';
import {
  signupValidator,
  loginValidator,
} from '../../validator/user.validator';

const prefix = '/user';

const router = express.Router();

router.post(prefix + '/signup', signupValidator, createUser);
router.post(prefix + '/authenticate', loginValidator, authenticate);

export default router;
