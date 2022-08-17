export type FindOptions = {
  offset?: number;
  limit?: number;
  search?: string;
};

export type FindResults<T> = {
  total: number;
  rows: T;
};
