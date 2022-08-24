import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [ConfigModule.forRoot(), TokensModule, AuthorizationModule, UsersModule],
})
export class AppModule {}
