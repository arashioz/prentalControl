import { jwtConstants } from './auth.constant';
import { UsersUtils } from './../users/utils/users.utils';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private usersUtils: UsersUtils,
    private jwtService: JwtService,
  ) {}

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(phone);
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
      return user;
    }
    return null;
  }

  /// routes services { Register }
  async registerUser(user: RegisterDto): Promise<any> {
    const foundUser = await this.usersService.findUser(user.phone);

    const otp = await this.usersUtils.otpCreator();
    await this.usersUtils.smsSender(user.phone, otp);
    const hash = await this.hashData(otp);
    const sendSms = await this.usersUtils.smsSender(user.phone , otp)
    console.log('sms status' , sendSms)
    console.log('OTP+CODE : ', otp);

    ///update password for login
    if (foundUser) {
      this.usersService.updatePasswordUser(foundUser, hash);
    } else {
      const newuser = await this.usersService.createUser({
        phone: user.phone,
        type: user.type,
        appVersion: user.appVersion,
      });
      if (newuser) return this.usersService.updatePasswordUser(newuser, hash);
    }

    /// create and update  password
  }

  /// routes services { Login }

  async loginUser(user: any) {
    const payload = { sub: user };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
