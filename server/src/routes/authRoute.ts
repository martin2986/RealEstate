import express from 'express';
import { signin, logout, signup } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);

export default router;
