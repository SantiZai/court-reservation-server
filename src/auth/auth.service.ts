import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User): Promise<{ user: User; token: string | null }> {
    const existingUser = await this.usersService.getUserByEmail(user.email);
    if (!existingUser) new HttpException('User not found', 404);
    const checkPassword = await compare(user.password, existingUser.password);
    if (!checkPassword) new HttpException('Password incorrect', 403);
    const token = this.jwtService.sign({
      id: existingUser.id,
      username: existingUser.fullName,
    });
    return { user: existingUser, token };
  }

  async signUp(user: User): Promise<User> {
    const hashedPassword = await hash(user.password, 10);
    const newUser: User = {
      ...user,
      password: hashedPassword,
    };
    return await this.usersService.createUser(newUser);
  }
}
