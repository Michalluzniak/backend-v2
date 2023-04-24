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
exports.AuthorizationResult = void 0;
const swagger_1 = require("@nestjs/swagger");
class AuthorizationResult {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'jwt' }),
    __metadata("design:type", String)
], AuthorizationResult.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'jwt' }),
    __metadata("design:type", String)
], AuthorizationResult.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', enum: ['Bearer'] }),
    __metadata("design:type", String)
], AuthorizationResult.prototype, "tokenType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    __metadata("design:type", Date)
], AuthorizationResult.prototype, "expiresAt", void 0);
exports.AuthorizationResult = AuthorizationResult;
//# sourceMappingURL=authorization.strategy.js.map