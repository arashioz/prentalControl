import { IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UserDto {
  phone: string;
  appVersion: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
    
  @IsNotEmpty()
  @IsString()
  type: 'Parent' | 'Children';

  @IsNotEmpty()
  appVersion: string;
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
