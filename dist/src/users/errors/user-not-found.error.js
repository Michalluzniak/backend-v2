"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const common_1 = require("@nestjs/common");
class UserNotFoundError extends common_1.NotFoundException {
    constructor() {
        super('User with given id does not exist');
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=user-not-found.error.js.map