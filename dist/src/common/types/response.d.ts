export declare class Pagination {
    readonly totalResults: number;
    readonly totalPages: number;
    readonly currentPage: number;
    readonly resultsPerPage: number;
    readonly nextPage: number | null;
    readonly previousPage: number | null;
    constructor(model: Pagination);
    static ofTotalResults(options: {
        totalResults: number;
        page?: number;
        resultsPerPage?: number;
    }): Pagination;
    static calculateOffset(options: {
        page?: number;
        resultsPerPage?: number;
    }): {
        offset?: number;
        limit?: number;
    };
}
export declare class SuccessResponse<T> {
    readonly data: T;
    constructor(data: T);
}
export declare class SuccessResponsePaginated<T> extends SuccessResponse<T> {
    readonly pagination: Pagination;
    constructor(data: T, pagination: Pagination);
}
