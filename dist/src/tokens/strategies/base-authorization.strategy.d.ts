import { ConfigService } from '@nestjs/config';
import { AuthorizationResult } from './authorization.strategy';
import { AccessTokensService } from '../services/access-tokens.service';
import { RefreshTokensService } from '../services/refresh-tokens.service';
export declare abstract class BaseAuthorizationStrategy {
    protected readonly accessTokensService: AccessTokensService;
    protected readonly refreshTokensService: RefreshTokensService;
    protected readonly configService: ConfigService;
    protected authorizeUser(username: string): AuthorizationResult;
}
