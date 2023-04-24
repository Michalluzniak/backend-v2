"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_persistence_1 = require("./users.persistence");
const users_in_memory_persistence_1 = require("./persistence/users-in-memory.persistence");
const seed_users_1 = require("./data/seed-users");
const config_1 = require("@nestjs/config");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        controllers: [users_controller_1.UsersController],
        providers: [
            {
                provide: users_persistence_1.IUserPersistence,
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const numberOfUsers = +(configService.get('SEED_USERS_COUNT') || 0);
                    return new users_in_memory_persistence_1.UsersInMemoryPersistence((0, seed_users_1.seedUsers)(numberOfUsers));
                },
            },
        ],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map