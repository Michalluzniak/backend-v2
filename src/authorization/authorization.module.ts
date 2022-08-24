import { Module } from '@nestjs/common';
import { TokensModule } from '../tokens/tokens.module';
import { AuthorizationController } from './authorization.controller';
import { ConfigModule } from '@nestjs/config';
import { UserCredentialsAuthorizationService } from './strategies/user-credentials-authorization.service';

@Module({
  imports: [ConfigModule, TokensModule],
  providers: [UserCredentialsAuthorizationService],
  controllers: [AuthorizationController],
})
export class AuthorizationModule {}
