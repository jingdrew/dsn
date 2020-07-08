import express from 'express';
import userRoute from './v1/user.route';

const router = express.Router();

router.use(userRoute);

export default router;
