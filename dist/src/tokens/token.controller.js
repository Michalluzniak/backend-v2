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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const user_credentials_authorization_strategy_1 = require("./strategies/user-credentials-authorization.strategy");
const authorization_strategy_1 = require("./strategies/authorization.strategy");
const swagger_1 = require("@nestjs/swagger");
const http_1 = require("http");
const refresh_token_authorization_strategy_1 = require("./strategies/refresh-token-authorization.strategy");
const token_request_1 = require("./token.request");
let TokenController = class TokenController {
    async authorize(request, query) {
        const authorizationHeader = request.headers['authorization'];
        const [authorizationType, credentials] = (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')) || [];
        if (!authorizationHeader) {
            throw new common_1.UnauthorizedException('Missing authorization header');
        }
        else if (!credentials) {
            throw new common_1.UnauthorizedException('Missing authorization credentials');
        }
        switch (query.strategy) {
            case token_request_1.TokenRequestStrategy.refreshToken:
                if ((authorizationType === null || authorizationType === void 0 ? void 0 : authorizationType.toLowerCase()) !== 'bearer') {
                    throw new common_1.UnauthorizedException('Wrong authorization type. Use Bearer instead');
                }
                return this.refreshTokenAuthorizationService.authorize(credentials);
            case token_request_1.TokenRequestStrategy.userCredentials:
                if ((authorizationType === null || authorizationType === void 0 ? void 0 : authorizationType.toLowerCase()) !== 'basic') {
                    throw new common_1.UnauthorizedException('Wrong authorization type. Use Basic instead');
                }
                return this.userCredentialsAuthorizationService.authorize(credentials);
            default:
                throw new common_1.NotImplementedException('Unsupported using value');
        }
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_credentials_authorization_strategy_1.UserCredentialsAuthorizationStrategy)
], TokenController.prototype, "userCredentialsAuthorizationService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", refresh_token_authorization_strategy_1.RefreshTokenAuthorizationStrategy)
], TokenController.prototype, "refreshTokenAuthorizationService", void 0);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiSecurity)('User Credentials'),
    (0, swagger_1.ApiSecurity)('Refresh Token'),
    (0, swagger_1.ApiCreatedResponse)({ type: authorization_strategy_1.AuthorizationResult }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [http_1.IncomingMessage, token_request_1.TokenRequest]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "authorize", null);
TokenController = __decorate([
    (0, common_1.Controller)('/authorization/token'),
    (0, swagger_1.ApiTags)('Authorization')
], TokenController);
exports.TokenController = TokenController;
//# sourceMappingURL=token.controller.js.map