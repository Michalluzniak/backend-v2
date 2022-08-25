import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokensService } from '../services/access-tokens.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(AccessTokensService)
    private readonly accessTokensService: AccessTokensService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    const [authorizationType, credentials] = authorizationHeader?.split(' ') || [];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header');
    } else if (authorizationType?.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException('Wrong authorization type. Use bearer instead!');
    } else if (!credentials) {
      throw new UnauthorizedException('Missing authorization credentials');
    }

    return this.accessTokensService.validateAccessToken(credentials);
  }
}
