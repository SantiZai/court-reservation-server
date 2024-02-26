import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

class UserLoginDto {
  email: string;
  password: string;
}

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: UserLoginDto })
  @Post('/login')
  async login(@Body() user: User): Promise<{ user: User; token: string }> {
    return await this.authService.login(user);
  }

  @Post('/sign-up')
  @HttpCode(204)
  async signUp(@Body() user: User): Promise<User> {
    return await this.authService.signUp(user);
  }
}
