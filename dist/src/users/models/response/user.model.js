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
exports.UserModel = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserModel {
}
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], UserModel.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserModel.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'email' }),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+48 581 432 22 23$', required: false }),
    __metadata("design:type", String)
], UserModel.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserModel.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserModel.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserModel.prototype, "biography", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserModel.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserModel.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'datetime' }),
    __metadata("design:type", Date)
], UserModel.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'datetime' }),
    __metadata("design:type", Date)
], UserModel.prototype, "updatedAt", void 0);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map