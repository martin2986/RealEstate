import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { catchErrors } from '../utils/catchError';
import prisma from '../lib/prisma';
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
