import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRoute';
import { errorHandler } from './utils/errorHandler';
import AppError from './utils/AppError';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Api url ${req.originalUrl} does not exist`, 404));
});
app.use(errorHandler);
export default app;
