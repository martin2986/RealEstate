import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../lib/prisma';
import AppError from '../utils/appError';
import { catchErrors } from '../utils/catchError';

export const protectRoute = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new AppError('You are not logged In', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  const currentUser = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });
  if (!currentUser) {
    return next(new AppError('Token is not valid', 401));
  }
  req.query.id = currentUser.id;

  next();
});
