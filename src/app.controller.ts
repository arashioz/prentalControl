import { AuthService } from './auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/user.dto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { TokenType } from './types/token.type';
import { LocalStrategy } from './auth/local.strategy';

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
    let requser = await req.user.phone;
    let user = await this.usersService.findOneUser(requser);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('addchildren')
  async addChildren(@Body() body, @Request() req) {
    console.log(body);
    return this.usersService.addChildren(req.user, body);
  }
}
