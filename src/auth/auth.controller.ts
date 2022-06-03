import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthService } from './auth.service';
import { User } from '../user/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.loginUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('2fa')
  validate(@User() userId, @Body() { code }) {
    return this.authService.check2fa(userId, code);
  }
}
