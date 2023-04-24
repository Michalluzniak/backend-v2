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
exports.CreateUserRequestModel = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUserRequestModel {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({ format: 'email' }),
    __metadata("design:type", String)
], CreateUserRequestModel.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(30),
    (0, swagger_1.ApiProperty)({ minLength: 5, maxLength: 30 }),
    __metadata("design:type", String)
], CreateUserRequestModel.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(255),
    (0, swagger_1.ApiProperty)({ minLength: 8, maxLength: 255 }),
    __metadata("design:type", String)
], CreateUserRequestModel.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMobilePhone)('any', { strictMode: true }),
    (0, swagger_1.ApiProperty)({
        format: 'phone-number',
        description: 'Supported formats: https://github.com/validatorjs/validator.js/blob/master/src/lib/isMobilePhone.js',
        required: false,
    }),
    __metadata("design:type", String)
], CreateUserRequestModel.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ maxLength: 80, required: false }),
    __metadata("design:type", String)
], CreateUserRequestModel.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ maxLength: 80, required: false }),
    __metadata("design:type", String)
], CreateUserRequestModel.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ maxLength: 500, required: false }),
    __metadata("design:type", String)
], CreateUserRequestModel.prototype, "biography", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ format: 'url', required: false, example: 'https://zaven.co/' }),
    __metadata("design:type", String)
], CreateUserRequestModel.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({ strictMode: true, format: 'YYYY-MM-DD' }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ format: 'date', required: false }),
    __metadata("design:type", String)
], CreateUserRequestModel.prototype, "birthday", void 0);
exports.CreateUserRequestModel = CreateUserRequestModel;
//# sourceMappingURL=create-user-request.model.js.map