"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAuthorizationStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const access_tokens_service_1 = require("../services/access-tokens.service");
const refresh_tokens_service_1 = require("../services/refresh-tokens.service");
class BaseAuthorizationStrategy {
    authorizeUser(username) {
        const { accessToken, expiresAt } = this.accessTokensService.generateAccessToken({ usr: username });
        const { refreshToken } = this.refreshTokensService.generateRefreshToken({ usr: username });
        return Object.freeze({ refreshToken, accessToken, expiresAt, tokenType: 'Bearer' });
    }
}
__decorate([
    (0, common_1.Inject)(access_tokens_service_1.AccessTokensService),
    __metadata("design:type", access_tokens_service_1.AccessTokensService)
], BaseAuthorizationStrategy.prototype, "accessTokensService", void 0);
__decorate([
    (0, common_1.Inject)(refresh_tokens_service_1.RefreshTokensService),
    __metadata("design:type", refresh_tokens_service_1.RefreshTokensService)
], BaseAuthorizationStrategy.prototype, "refreshTokensService", void 0);
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], BaseAuthorizationStrategy.prototype, "configService", void 0);
exports.BaseAuthorizationStrategy = BaseAuthorizationStrategy;
//# sourceMappingURL=base-authorization.strategy.js.map