"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredentialsAuthorizationStrategy = void 0;
const common_1 = require("@nestjs/common");
const base_authorization_strategy_1 = require("./base-authorization.strategy");
let UserCredentialsAuthorizationStrategy = class UserCredentialsAuthorizationStrategy extends base_authorization_strategy_1.BaseAuthorizationStrategy {
    async authorize(credentials) {
        let base64DecodedCredentials;
        try {
            base64DecodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid credentials format. Use basic authorization value.');
        }
        const validUsername = this.configService.get('ADMIN_USERNAME') || 'admin';
        const validPassword = this.configService.get('ADMIN_PASSWORD') || 'password';
        const username = base64DecodedCredentials.split(':')[0];
        const password = base64DecodedCredentials.substring(username.length + 1);
        if (username !== validUsername || password !== validPassword) {
            throw new common_1.UnauthorizedException('Invalid credentials format. Use basic authorization value.');
        }
        return this.authorizeUser(username);
    }
};
UserCredentialsAuthorizationStrategy = __decorate([
    (0, common_1.Injectable)()
], UserCredentialsAuthorizationStrategy);
exports.UserCredentialsAuthorizationStrategy = UserCredentialsAuthorizationStrategy;
//# sourceMappingURL=user-credentials-authorization.strategy.js.map