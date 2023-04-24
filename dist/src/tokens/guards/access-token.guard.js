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
exports.AccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const access_tokens_service_1 = require("../services/access-tokens.service");
let AccessTokenGuard = class AccessTokenGuard {
    constructor(accessTokensService) {
        this.accessTokensService = accessTokensService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];
        const [authorizationType, credentials] = (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')) || [];
        if (!authorizationHeader) {
            throw new common_1.UnauthorizedException('Missing authorization header');
        }
        else if ((authorizationType === null || authorizationType === void 0 ? void 0 : authorizationType.toLowerCase()) !== 'bearer') {
            throw new common_1.UnauthorizedException('Wrong authorization type. Use bearer instead!');
        }
        else if (!credentials) {
            throw new common_1.UnauthorizedException('Missing authorization credentials');
        }
        else if (!this.accessTokensService.validateAccessToken(credentials)) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return true;
    }
};
AccessTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(access_tokens_service_1.AccessTokensService)),
    __metadata("design:paramtypes", [access_tokens_service_1.AccessTokensService])
], AccessTokenGuard);
exports.AccessTokenGuard = AccessTokenGuard;
//# sourceMappingURL=access-token.guard.js.map