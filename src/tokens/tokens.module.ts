import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokensPersistence } from './persistence/refresh-tokens.persistence';
import { UserCredentialsAuthorizationStrategy } from './strategies/user-credentials-authorization.strategy';
import { RefreshTokenAuthorizationStrategy } from './strategies/refresh-token-authorization.strategy';
import { AccessTokensService } from './services/access-tokens.service';
import { RefreshTokensService } from './services/refresh-tokens.service';
import { TokenController } from './token.controller';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [TokenController],
  providers: [
    UserCredentialsAuthorizationStrategy,
    RefreshTokenAuthorizationStrategy,
    AccessTokensService,
    RefreshTokensService,
    RefreshTokensPersistence,
  ],
  exports: [AccessTokensService],
})
export class TokensModule {}
