import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import ormConfig from 'src/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule],
})
export class AppModule {}
