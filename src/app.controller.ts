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

@Controller('api/v1')
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'sayHello';
  }

  ///register users
  @Post('auth/register')
  register(@Body() user: RegisterDto) {
    console.log(user);
    return this.authService.registerUser(user);
  }

  /// authantication users
  @UseGuards(AuthGuard('jwt'))
  @Post('auth/login')
  login(@Request() req) {
    console.log(req.user);
    return this.authService.loginUser(req.user);
  }
}
