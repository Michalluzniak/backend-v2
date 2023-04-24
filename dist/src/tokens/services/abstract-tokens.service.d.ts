import { ConfigService } from '@nestjs/config';
import * as JWT from 'jsonwebtoken';
export declare abstract class AbstractTokensService {
    protected readonly configService: ConfigService;
    protected static _generateJWT(claims: object, options: {
        expiresIn: number;
        algorithm: JWT.Algorithm;
        privateKey: string;
    }): {
        token: string;
        expiresAt: Date;
    };
}
