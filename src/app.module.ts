import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [ConfigModule.forRoot(), TokensModule, UsersModule],
})
export class AppModule {}
