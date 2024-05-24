import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { catchErrors } from '../utils/catchError';
import prisma from '../lib/prisma';
import { expiryDate, generateJWT } from '../utils/util';
import AppError from '../utils/appError';
export const signup = catchErrors(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  res.status(201).json({
    message: 'User created successfully',
  });
});

export const signin = catchErrors(async (req: Request, res: Response) => {
  const { password, username } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) throw new AppError('User not found', 401);

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) throw new AppError('Invalid Credentials', 401);
  const token = generateJWT({ id: user.id });
  const cookieOption = {
    expires: expiryDate,
    httpOnly: true,
  };
  res.cookie('token', token, cookieOption).status(200).json({
    message: 'Logged in successfully',
    username: user.username,
    email: user.email,
    profilePhoto: user.avatar,
    id: user.id,
  });
});

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token').status(200).json({ message: 'Logout successfully' });
};
