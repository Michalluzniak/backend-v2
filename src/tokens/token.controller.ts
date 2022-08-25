import { Controller, Get, Inject, NotImplementedException, Query, Req, UnauthorizedException } from '@nestjs/common';
import { UserCredentialsAuthorizationStrategy } from './strategies/user-credentials-authorization.strategy';
import { AuthorizationResult } from './strategies/authorization.strategy';
import { ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IncomingMessage } from 'http';
import { RefreshTokenAuthorizationStrategy } from './strategies/refresh-token-authorization.strategy';
import { TokenRequest, TokenRequestStrategy } from './token.request';

@Controller('/authorization/token')
@ApiTags('Authorization')
export class TokenController {
  @Inject()
  private readonly userCredentialsAuthorizationService: UserCredentialsAuthorizationStrategy;

  @Inject()
  private readonly refreshTokenAuthorizationService: RefreshTokenAuthorizationStrategy;

  @Get('/')
  @ApiSecurity('User Credentials')
  @ApiSecurity('Refresh Token')
  @ApiCreatedResponse({ type: AuthorizationResult })
  async authorize(@Req() request: IncomingMessage, @Query() query: TokenRequest): Promise<AuthorizationResult> {
    const authorizationHeader = request.headers['authorization'];
    const [authorizationType, credentials] = authorizationHeader?.split(' ') || [];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header');
    } else if (!credentials) {
      throw new UnauthorizedException('Missing authorization credentials');
    }

    switch (query.strategy) {
      case TokenRequestStrategy.refreshToken:
        if (authorizationType?.toLowerCase() !== 'bearer') {
          throw new UnauthorizedException('Wrong authorization type. Use Bearer instead');
        }

        return this.refreshTokenAuthorizationService.authorize(credentials);
      case TokenRequestStrategy.userCredentials:
        if (authorizationType?.toLowerCase() !== 'basic') {
          throw new UnauthorizedException('Wrong authorization type. Use Basic instead');
        }

        return this.userCredentialsAuthorizationService.authorize(credentials);
      default:
        throw new NotImplementedException('Unsupported using value');
    }
  }
}
