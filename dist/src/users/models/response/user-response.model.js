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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseModel = void 0;
const response_1 = require("../../../common/types/response");
const user_model_1 = require("./user.model");
const swagger_1 = require("@nestjs/swagger");
class UserResponseModel extends response_1.SuccessResponse {
    constructor(_a) {
        var { password } = _a, user = __rest(_a, ["password"]);
        super(user);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_model_1.UserModel, isArray: true }),
    __metadata("design:type", user_model_1.UserModel)
], UserResponseModel.prototype, "data", void 0);
exports.UserResponseModel = UserResponseModel;
//# sourceMappingURL=user-response.model.js.map