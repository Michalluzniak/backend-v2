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
exports.SuccessResponsePaginated = exports.SuccessResponse = exports.Pagination = void 0;
const swagger_1 = require("@nestjs/swagger");
class Pagination {
    constructor(model) {
        this.totalResults = model.totalResults;
        this.totalPages = model.totalPages;
        this.currentPage = model.currentPage;
        this.resultsPerPage = model.resultsPerPage;
        this.nextPage = model.nextPage;
        this.previousPage = model.previousPage;
    }
    static ofTotalResults(options) {
        const resultsPerPage = options.resultsPerPage || options.totalResults || 1;
        const totalPages = Math.ceil(options.totalResults / resultsPerPage) || 1;
        const currentPage = options.page > totalPages ? totalPages : options.page < 1 ? 1 : options.page || 1;
        return new Pagination({
            totalResults: options.totalResults,
            totalPages: totalPages,
            currentPage: currentPage,
            resultsPerPage: resultsPerPage,
            nextPage: currentPage < totalPages ? currentPage + 1 : null,
            previousPage: currentPage > 1 ? currentPage - 1 : null,
        });
    }
    static calculateOffset(options) {
        const currentPage = options.page < 1 ? 1 : options.page || 1;
        if (!options.resultsPerPage) {
            return { offset: 0, limit: undefined };
        }
        return {
            offset: (currentPage - 1) * options.resultsPerPage,
            limit: options.resultsPerPage,
        };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'int' }),
    __metadata("design:type", Number)
], Pagination.prototype, "totalResults", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'int' }),
    __metadata("design:type", Number)
], Pagination.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'int' }),
    __metadata("design:type", Number)
], Pagination.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'int' }),
    __metadata("design:type", Number)
], Pagination.prototype, "resultsPerPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'int', nullable: true }),
    __metadata("design:type", Number)
], Pagination.prototype, "nextPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'int', nullable: true }),
    __metadata("design:type", Number)
], Pagination.prototype, "previousPage", void 0);
exports.Pagination = Pagination;
class SuccessResponse {
    constructor(data) {
        this.data = data;
    }
}
exports.SuccessResponse = SuccessResponse;
class SuccessResponsePaginated extends SuccessResponse {
    constructor(data, pagination) {
        super(data);
        this.pagination = pagination;
    }
}
exports.SuccessResponsePaginated = SuccessResponsePaginated;
//# sourceMappingURL=response.js.map