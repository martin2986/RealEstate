import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/userController';
import { protectRoute } from '../middlewares/protectedRoute';

const router = express.Router();

router.use(protectRoute);
router.get('/', getUsers);
router.get('/user', getUser);
router.patch('/update', updateUser);
router.delete('/:id', deleteUser);

export default router;
