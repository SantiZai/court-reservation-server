import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['auth-token'][0];
  !token ?? res.status(401).json({ message: "Can't be found a token" });
  try {
    const verified = jwt.verify(token, 'secretkey');
    res.send(verified);
    next();
  } catch (e) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
