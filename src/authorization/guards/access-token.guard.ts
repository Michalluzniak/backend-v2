import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ITokenService, TokensService } from '../../tokens/services/tokens.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(ITokenService)
    private readonly tokenService: TokensService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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

    return !!this.tokenService.verifyAccessToken(credentials);
  }
}
