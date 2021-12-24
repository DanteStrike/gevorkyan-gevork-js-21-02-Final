export interface IServerRes<T> {
  status: number;
  data: T;
}
export interface IServerErrorRes extends IServerRes<{error: string}> {}
