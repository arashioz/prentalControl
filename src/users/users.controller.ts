import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegisterDto } from 'src/dto/user.dto';
import { User } from 'src/models/usersSchema/parent.schema';
import { UsersService } from './users.service';
import { UsersUtils } from './utils/users.utils';
import * as bcrypt from 'bcrypt';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private usersUtils: UsersUtils,
  ) {}

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() user: RegisterDto): Promise<User> {
    const foundUser = await this.usersService.findUser(user);

    const otp = await this.usersUtils.otpCreator();
    const hash = await this.hashData(otp);
    const sendSms = await this.usersUtils.smsSender(user.phone, otp);
    console.log('sms status', sendSms);
    console.log('OTP+CODE : ', otp);
    // console.log(user);

    if (!foundUser) {
      const newuser = await this.usersService.createUser(
        {
          phone: user.phone,
          type: user.type,
          appVersion: user.appVersion,
          token: otp,
        },
        otp,
        hash,
      );
      return newuser;
    }
    ///update password for login
    if (foundUser) {
      throw new ForbiddenException('User Already Registred');
    }
  }


  @UseGuards(JwtAuthGuard)
  @Post('verify')
  @HttpCode(204)
  async verify(@Request() req): Promise<any> {
    return this.usersService.verify(req.user.userId, req.body);
  }
}
