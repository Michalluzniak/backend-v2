export declare type FindOptions = {
    offset?: number;
    limit?: number;
    search?: string;
};
export declare type FindResults<T> = {
    total: number;
    rows: T;
};
