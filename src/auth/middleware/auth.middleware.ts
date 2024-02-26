import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers["auth-token"])
    const token = req.headers['auth-token'][0];
    !token ??
      res.status(401).json({
        message: "Can't be found a token",
      });
    try {
      const verified = jwt.verify(token, 'secretkey');
      res.send(verified);
      next();
    } catch (e) {
      res.status(400).json({
        message: 'Invalid token',
      });
    }
  }
}
