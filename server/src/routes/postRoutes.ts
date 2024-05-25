import express from 'express';
import { addPost, deletePost, getPost, getPosts, updatePost } from '../controllers/postController';
import { protectRoute } from '../middlewares/protectedRoute';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.use(protectRoute);
router.post('/', addPost);
router.put('/updatePost', updatePost);
router.delete('/:id', deletePost);
export default router;
