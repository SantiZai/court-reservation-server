class UserLoginDto {
  email: string;
  password: string;
}

class UserRegisterDto extends UserLoginDto {
  password: string;
}

export { UserLoginDto, UserRegisterDto };
