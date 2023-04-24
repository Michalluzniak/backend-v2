import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AccessTokensService } from '../services/access-tokens.service';
export declare class AccessTokenGuard implements CanActivate {
    private readonly accessTokensService;
    constructor(accessTokensService: AccessTokensService);
    canActivate(context: ExecutionContext): boolean;
}
