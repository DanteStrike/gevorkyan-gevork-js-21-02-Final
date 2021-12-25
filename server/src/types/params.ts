interface IPagination<T> {
  page: T;
  limit: T;
}
export type IPaginationQuery = Partial<IPagination<string>>;
export type IPaginationParams = IPagination<number>;
export type INormalizedPaginationParams = IPaginationParams & {dataSlice?: {left: number; right: number}};
