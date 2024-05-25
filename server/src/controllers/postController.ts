import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import AppError from '../utils/appError';
import { catchErrors } from '../utils/catchError';

export const getPosts = catchErrors(async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.status(200).json(posts);
});
export const getPost = catchErrors(async (req: Request, res: Response) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(post);
});
export const addPost = catchErrors(async (req: Request, res: Response) => {
  const newPost = await prisma.post.create({
    data: {
      ...req.body,
      userId: req.query.id,
    },
  });
  res.status(200).json(newPost);
});
export const updatePost = catchErrors(async (req: Request, res: Response) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json('sdsds');
});
export const deletePost = catchErrors(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  if (!post) throw new AppError('Not Authorized', 403);

  await prisma.post.delete({
    where: {
      id,
    },
  });
  res.status(200).json({ message: 'post deleted successfully' });
});
