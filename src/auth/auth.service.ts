import { jwtConstants } from './auth.constant';
import { UsersUtils } from './../users/utils/users.utils';
import { UsersService } from './../users/users.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'src/types/token.type';

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
    const user = await this.usersService.findOneUser(phone);
    if (!user) {
      throw new NotFoundException('User Not Found ');
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new UnauthorizedException('User or Password its Wrong');
    if (user && match) {
      return user;
    }
    return null;
  }

  /// routes services { Register }
  async registerUser(user: RegisterDto): Promise<any> {
    const foundUser = await this.usersService.findUser(user);

    const otp = await this.usersUtils.otpCreator();
    await this.usersUtils.smsSender(user.phone, otp);
    const hash = await this.hashData(otp);
    const sendSms = await this.usersUtils.smsSender(user.phone, otp);
    console.log('sms status', sendSms);
    console.log('OTP+CODE : ', otp);
    console.log(user);

    ///update password for login
    if (foundUser) {
      await this.usersService.updateUser(foundUser.phone, {
        password: hash,
        token: otp,
      });
      const fuser = await this.usersService.findUser(user);
      return fuser;
    } else {
      const newuser = await this.usersService.createUser({
        phone: user.phone,
        type: user.type,
        appVersion: user.appVersion,
        token: otp.toString(),
      });
      return newuser
    }
  }

  /// routes services { Login }

  async loginUser(user: any): Promise<TokenType> {
    const payload = { sub: user };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
