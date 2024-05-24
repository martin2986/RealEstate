import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { catchErrors } from '../utils/catchError';
import bcrypt from 'bcrypt';
import AppError from '../utils/appError';
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
  const { password, email, username, profilePhoto } = req.body;
  let updatedPassword;
  if (password) updatedPassword = await bcrypt.hash(password, 10);
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      username,
      avatar: profilePhoto,
      ...(updatedPassword && { password: updatedPassword }),
    },
  });
  res.status(200).json({
    username: updatedUser.username,
    email: updatedUser.email,
    profilePhoto: updatedUser.avatar,
    id: updatedUser.id,
  });
});
export const deleteUser = catchErrors(async (req: Request, res: Response) => {});
