"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokensPersistence = void 0;
const common_1 = require("@nestjs/common");
let RefreshTokensPersistence = class RefreshTokensPersistence {
    constructor() {
        this.tokens = new Set();
    }
    create(tokenId) {
        this.tokens.add(tokenId);
    }
    exists(tokenId) {
        return this.tokens.has(tokenId);
    }
    destroy(tokenId) {
        this.tokens.delete(tokenId);
    }
};
RefreshTokensPersistence = __decorate([
    (0, common_1.Injectable)()
], RefreshTokensPersistence);
exports.RefreshTokensPersistence = RefreshTokensPersistence;
//# sourceMappingURL=refresh-tokens.persistence.js.map