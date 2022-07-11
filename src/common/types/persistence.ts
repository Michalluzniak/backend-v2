export type FindOptions = {
  offset?: number;
  limit?: number;
};

export type FindResults<T> = {
  total: number;
  rows: T;
};
