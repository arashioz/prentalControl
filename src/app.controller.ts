import { AuthService } from './auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/user.dto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { TokenType } from './types/token.type';

@Controller('api/v1')
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return 'sayHello';
  }

  ///register users
  @Post('auth/register')
  register(@Body() user: RegisterDto) {
    return this.authService.registerUser(user);
  }

  /// authantication users
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req): Promise<TokenType> {
    return this.authService.loginUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  logout(@Request() req) {
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // let us = await this.usersService.findUser(req.user.payload.phone);
    // console.log('us', us);
    // console.log(req.user.phone);
    return this.usersService.findUser(req.user.phone)
  }
}
