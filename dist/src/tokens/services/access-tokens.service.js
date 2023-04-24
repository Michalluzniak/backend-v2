"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokensService = void 0;
const JWT = __importStar(require("jsonwebtoken"));
const common_1 = require("@nestjs/common");
const abstract_tokens_service_1 = require("./abstract-tokens.service");
class AccessTokensService extends abstract_tokens_service_1.AbstractTokensService {
    generateAccessToken(claims) {
        const privateKey = this.configService.get('JWT_ACCESS_TOKEN_PRIVATE_KEY');
        if (!privateKey) {
            throw new common_1.InternalServerErrorException('JWT_ACCESS_TOKEN_PRIVATE_KEY variable needs to be configured!');
        }
        const algorithm = this.configService.get('JWT_ACCESS_TOKEN_ALGORITHM') || 'ES512';
        const expiresIn = +this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN') || 60 * 60;
        const { token: accessToken, expiresAt } = abstract_tokens_service_1.AbstractTokensService._generateJWT(claims, {
            algorithm,
            expiresIn,
            privateKey,
        });
        return { accessToken, expiresAt };
    }
    validateAccessToken(token) {
        const publicKey = this.configService.get('JWT_ACCESS_TOKEN_PUBLIC_KEY');
        if (!publicKey) {
            throw new common_1.InternalServerErrorException('JWT_ACCESS_TOKEN_PUBLIC_KEY variable needs to be configured!');
        }
        try {
            return !!JWT.verify(token, publicKey, {
                algorithms: [this.configService.get('JWT_ACCESS_TOKEN_ALGORITHM') || 'ES512'],
            });
        }
        catch (e) {
            return false;
        }
    }
}
exports.AccessTokensService = AccessTokensService;
//# sourceMappingURL=access-tokens.service.js.map