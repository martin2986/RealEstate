import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { catchErrors } from '../utils/catchError';
import { ParsedQs } from 'qs';
export const getUsers = catchErrors(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});
export const getUser = catchErrors(async (req: Request, res: Response) => {
  const id = req.query.id as string;
  console.log(id);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  res.status(200).json({
    username: user.username,
    email: user.email,
    profilePhoto: user.avatar,
    id: user.id,
  });
});
export const updateUser = catchErrors(async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const tokenUserId = req.body.userId;
  //   const tokenUserId = req.userId;
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
    },
  });
  res.status(200).json({
    username: user.username,
    email: user.email,
    profilePhoto: user.avatar,
    id: user.id,
  });
});
export const deleteUser = catchErrors(async (req: Request, res: Response) => {});
