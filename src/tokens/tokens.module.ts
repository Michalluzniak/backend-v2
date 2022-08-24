import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ITokenService, TokensService } from './services/tokens.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [{ provide: ITokenService, useClass: TokensService }],
  exports: [ITokenService],
})
export class TokensModule {}
