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
exports.TokenRequest = exports.TokenRequestStrategy = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var TokenRequestStrategy;
(function (TokenRequestStrategy) {
    TokenRequestStrategy["refreshToken"] = "refreshToken";
    TokenRequestStrategy["userCredentials"] = "userCredentials";
})(TokenRequestStrategy = exports.TokenRequestStrategy || (exports.TokenRequestStrategy = {}));
class TokenRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', enum: Object.values(TokenRequestStrategy) }),
    (0, class_validator_1.IsIn)(Object.values(TokenRequestStrategy)),
    __metadata("design:type", String)
], TokenRequest.prototype, "strategy", void 0);
exports.TokenRequest = TokenRequest;
//# sourceMappingURL=token.request.js.map