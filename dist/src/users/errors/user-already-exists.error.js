"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsError = void 0;
const common_1 = require("@nestjs/common");
class UserAlreadyExistsError extends common_1.ConflictException {
    constructor(field) {
        super(`User with given ${field} already exists`);
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
//# sourceMappingURL=user-already-exists.error.js.map