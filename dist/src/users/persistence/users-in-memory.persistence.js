"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersInMemoryPersistence = void 0;
const uuid_1 = require("../../common/types/uuid");
const user_already_exists_error_1 = require("../errors/user-already-exists.error");
const user_not_found_error_1 = require("../errors/user-not-found.error");
class UsersInMemoryPersistence {
    constructor(models) {
        this.users = new Map();
        this.usernames = new Set();
        this.emails = new Set();
        models === null || models === void 0 ? void 0 : models.forEach((model) => {
            this.users.set(model.id.toLowerCase(), UsersInMemoryPersistence.normalizeUserModel(model));
            this.usernames.add(model.username);
            this.emails.add(model.email);
        });
    }
    static createUserModel(model) {
        return UsersInMemoryPersistence.normalizeUserModel(Object.assign(Object.assign({}, model), { id: new uuid_1.UUID().toString(), createdAt: new Date(), updatedAt: new Date() }));
    }
    static normalizeUserModel(model) {
        return Object.assign(Object.assign({}, model), { id: model.id.toLowerCase(), email: model.email.toLowerCase().trim(), username: model.username.toLowerCase().trim() });
    }
    static _findUserFilter(search) {
        return (user) => {
            var _a, _b;
            return user.username.includes(search) ||
                user.email.includes(search) ||
                ((_a = user.firstName) === null || _a === void 0 ? void 0 : _a.includes(search)) ||
                ((_b = user.lastName) === null || _b === void 0 ? void 0 : _b.includes(search)) ||
                `${user.firstName || ''} ${user.lastName || ''}`.trim().includes(search);
        };
    }
    async find(options) {
        const search = options === null || options === void 0 ? void 0 : options.search;
        const offset = (options === null || options === void 0 ? void 0 : options.offset) || 0;
        const limit = (options === null || options === void 0 ? void 0 : options.limit) ? offset + (options === null || options === void 0 ? void 0 : options.limit) || 0 : this.users.size;
        const users = search
            ? [...this.users.values()].filter(UsersInMemoryPersistence._findUserFilter(search))
            : [...this.users.values()];
        return {
            total: users.length,
            rows: users.slice(offset, limit),
        };
    }
    async findById(id) {
        if (!this.users.has(id.toLowerCase())) {
            throw new user_not_found_error_1.UserNotFoundError();
        }
        return this.users.get(id.toLowerCase());
    }
    async save(model) {
        const alreadyExists = 'id' in model && 'createdAt' in model && 'updatedAt' in model;
        const user = alreadyExists
            ? UsersInMemoryPersistence.normalizeUserModel(model)
            : UsersInMemoryPersistence.createUserModel(model);
        if (!alreadyExists && this.emails.has(user.email)) {
            throw new user_already_exists_error_1.UserAlreadyExistsError('email');
        }
        else if (!alreadyExists && this.usernames.has(user.username)) {
            throw new user_already_exists_error_1.UserAlreadyExistsError('username');
        }
        this.users.set(user.id, user);
        this.emails.add(user.email);
        this.usernames.add(user.username);
        return user;
    }
    async delete(id) {
        const user = await this.findById(id);
        this.users.delete(user.id);
        this.usernames.delete(user.username);
        this.emails.delete(user.email);
    }
}
exports.UsersInMemoryPersistence = UsersInMemoryPersistence;
//# sourceMappingURL=users-in-memory.persistence.js.map