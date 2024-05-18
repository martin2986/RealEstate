import jwt from 'jsonwebtoken';

export const expiryDate = new Date(Date.now() + 3600000);
export const generateJWT = function (payload: { id: string }) {
  const privateKey: any = process.env.JWT_SECRET;
  return jwt.sign(payload, privateKey);
};
