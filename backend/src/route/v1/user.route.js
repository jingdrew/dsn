import express from 'express';
import {
  getAllUsers,
  getByUsername,
  createUser,
} from '../../controller/user.controller';

const router = express.Router();

router.get('/list', getAllUsers);
router.get('/one', getByUsername);
router.get('/create', createUser);

export default router;
