import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('/login')
  async login(req: Request, res: Response): Promise<User> {
    try {
      const { id, password } = req.body;
      const existingUser = await this.usersService.getUser(id);
      !existingUser ??
        res.status(404).json({ message: "Can't be found an user" });
      compare(password, existingUser.password)
        .then((isValidPassword: boolean) => {
          if (isValidPassword) {
            const token = jwt.sign({ id: existingUser.id }, 'secretkey', {
              expiresIn: 86400,
            });
            res.status(200).json({ auth: true, token });
          } else
            res.status(400).json({
              message: 'The password are invalid',
            });
        })
        .catch((e) => console.error(e));
      return existingUser;
    } catch (e) {
      res.status(500).json({
        message: 'An error occurred while trying to obtain account details',
        e,
      });
    }
  }

  @Post('/sign-up')
  @HttpCode(204)
  async signUp(@Body() user: User): Promise<User> {
    const hashedPassword = await hash(user.password, 10);
    const newUser: User = {
      ...user,
      password: hashedPassword,
    };
    return await this.usersService.createUser(newUser);
  }
}
