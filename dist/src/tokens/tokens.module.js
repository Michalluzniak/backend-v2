"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const refresh_tokens_persistence_1 = require("./persistence/refresh-tokens.persistence");
const user_credentials_authorization_strategy_1 = require("./strategies/user-credentials-authorization.strategy");
const refresh_token_authorization_strategy_1 = require("./strategies/refresh-token-authorization.strategy");
const access_tokens_service_1 = require("./services/access-tokens.service");
const refresh_tokens_service_1 = require("./services/refresh-tokens.service");
const token_controller_1 = require("./token.controller");
let TokensModule = class TokensModule {
};
TokensModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        controllers: [token_controller_1.TokenController],
        providers: [
            user_credentials_authorization_strategy_1.UserCredentialsAuthorizationStrategy,
            refresh_token_authorization_strategy_1.RefreshTokenAuthorizationStrategy,
            access_tokens_service_1.AccessTokensService,
            refresh_tokens_service_1.RefreshTokensService,
            refresh_tokens_persistence_1.RefreshTokensPersistence,
        ],
        exports: [access_tokens_service_1.AccessTokensService],
    })
], TokensModule);
exports.TokensModule = TokensModule;
//# sourceMappingURL=tokens.module.js.map