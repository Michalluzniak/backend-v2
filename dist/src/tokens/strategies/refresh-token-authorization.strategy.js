"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenAuthorizationStrategy = void 0;
const common_1 = require("@nestjs/common");
const base_authorization_strategy_1 = require("./base-authorization.strategy");
let RefreshTokenAuthorizationStrategy = class RefreshTokenAuthorizationStrategy extends base_authorization_strategy_1.BaseAuthorizationStrategy {
    async authorize(credentials) {
        const token = credentials;
        if (!this.refreshTokensService.validateRefreshToken(token)) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const { usr: username } = this.refreshTokensService.decodeRefreshToken(token);
        this.refreshTokensService.invalidateRefreshToken(token);
        return this.authorizeUser(username);
    }
};
RefreshTokenAuthorizationStrategy = __decorate([
    (0, common_1.Injectable)()
], RefreshTokenAuthorizationStrategy);
exports.RefreshTokenAuthorizationStrategy = RefreshTokenAuthorizationStrategy;
//# sourceMappingURL=refresh-token-authorization.strategy.js.map