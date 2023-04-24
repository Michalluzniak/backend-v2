"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUID = void 0;
const uuid_1 = require("uuid");
class UUID {
    constructor() {
        this.value = (0, uuid_1.v4)();
    }
    toString() {
        return this.value;
    }
    toJSON() {
        return this.value;
    }
}
exports.UUID = UUID;
//# sourceMappingURL=uuid.js.map