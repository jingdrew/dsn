import express from 'express';
import userRoute from './v1/user.route';
const prefix = '/api/v1';

const router = express.Router();

router.use(prefix, userRoute);

export default router;
