import { Controller, Inject, Post, Req, UnauthorizedException } from '@nestjs/common';
import { UserCredentialsAuthorizationService } from './strategies/user-credentials-authorization.service';
import { AuthorizationResult } from './authorization.service';
import { ApiCreatedResponse, ApiSecurity } from '@nestjs/swagger';
import { IncomingMessage } from 'http';

@Controller()
export class AuthorizationController {
  @Inject()
  private readonly userCredentialsAuthorizationService: UserCredentialsAuthorizationService;

  @Post('/authorize')
  @ApiSecurity('basic')
  @ApiCreatedResponse({ type: AuthorizationResult })
  async authorize(@Req() request: IncomingMessage): Promise<AuthorizationResult> {
    const authorizationHeader = request.headers['authorization'];
    const [authorizationType, credentials] = authorizationHeader?.split(' ') || [];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header');
    } else if (authorizationType?.toLowerCase() !== 'basic') {
      throw new UnauthorizedException('Wrong authorization type. Use basic instead!');
    } else if (!credentials) {
      throw new UnauthorizedException('Missing authorization credentials');
    }

    return this.userCredentialsAuthorizationService.authorize(credentials);
  }
}
