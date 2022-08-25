import { IsNotEmpty, isString, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  appVersion: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  type: 'PARENT' | 'CHILD';

  @IsNotEmpty()
  appVersion: string;

  token?: string;
  name?: string | null;
}
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  userId: any;
  phone: any;
}
