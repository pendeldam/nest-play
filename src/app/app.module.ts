import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { VerificationModule } from 'src/verification/verification.module';
import ormConfig from 'src/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    AuthModule,
    VerificationModule,
  ],
})
export class AppModule {}
