import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { VerificationModule } from '../verification/verification.module';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { jwtOptions } from '../strategy/jwt.config';

@Module({
  imports: [
    UserModule,
    VerificationModule,
    PassportModule,
    JwtModule.register({
      secret: jwtOptions.secret,
      signOptions: { expiresIn: jwtOptions.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
