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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokensService = void 0;
const JWT = __importStar(require("jsonwebtoken"));
const abstract_tokens_service_1 = require("./abstract-tokens.service");
const common_1 = require("@nestjs/common");
const refresh_tokens_persistence_1 = require("../persistence/refresh-tokens.persistence");
const uuid_1 = require("../../common/types/uuid");
class RefreshTokensService extends abstract_tokens_service_1.AbstractTokensService {
    generateRefreshToken(claims) {
        const finalClaims = Object.assign(Object.assign({}, claims), { tid: new uuid_1.UUID().toString() });
        const privateKey = this.configService.get('JWT_REFRESH_TOKEN_PRIVATE_KEY');
        if (!privateKey) {
            throw new common_1.InternalServerErrorException('JWT_REFRESH_TOKEN_PRIVATE_KEY variable needs to be configured!');
        }
        const algorithm = this.configService.get('JWT_REFRESH_TOKEN_ALGORITHM') || 'ES512';
        const expiresIn = +this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN') || 24 * 60 * 60;
        const { token: refreshToken, expiresAt } = abstract_tokens_service_1.AbstractTokensService._generateJWT(finalClaims, {
            algorithm,
            expiresIn,
            privateKey,
        });
        this.refreshTokensPersistence.create(finalClaims.tid);
        return { refreshToken, expiresAt };
    }
    validateRefreshToken(token) {
        const publicKey = this.configService.get('JWT_REFRESH_TOKEN_PUBLIC_KEY');
        if (!publicKey) {
            throw new common_1.InternalServerErrorException('JWT_REFRESH_TOKEN_PUBLIC_KEY variable needs to be configured!');
        }
        try {
            const { tid } = JWT.verify(token, publicKey, {
                algorithms: [this.configService.get('JWT_REFRESH_TOKEN_ALGORITHM') || 'ES512'],
            });
            return this.refreshTokensPersistence.exists(tid);
        }
        catch (e) {
            return false;
        }
    }
    decodeRefreshToken(token) {
        const publicKey = this.configService.get('JWT_REFRESH_TOKEN_PUBLIC_KEY');
        if (!publicKey) {
            throw new common_1.InternalServerErrorException('JWT_REFRESH_TOKEN_PUBLIC_KEY variable needs to be configured!');
        }
        return JWT.verify(token, publicKey, {
            algorithms: [this.configService.get('JWT_REFRESH_TOKEN_ALGORITHM') || 'ES512'],
        });
    }
    invalidateRefreshToken(token) {
        const publicKey = this.configService.get('JWT_REFRESH_TOKEN_PUBLIC_KEY');
        if (!publicKey) {
            throw new common_1.InternalServerErrorException('JWT_REFRESH_TOKEN_PUBLIC_KEY variable needs to be configured!');
        }
        const { tid } = JWT.verify(token, publicKey, {
            algorithms: [this.configService.get('JWT_REFRESH_TOKEN_ALGORITHM') || 'ES512'],
        });
        return this.refreshTokensPersistence.destroy(tid);
    }
}
__decorate([
    (0, common_1.Inject)(refresh_tokens_persistence_1.RefreshTokensPersistence),
    __metadata("design:type", refresh_tokens_persistence_1.RefreshTokensPersistence)
], RefreshTokensService.prototype, "refreshTokensPersistence", void 0);
exports.RefreshTokensService = RefreshTokensService;
//# sourceMappingURL=refresh-tokens.service.js.map