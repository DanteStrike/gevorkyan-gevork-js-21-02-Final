import {IUserPreview} from './user';
import {IPostPreview} from './post';
import {IComment} from './comment';

export interface IList<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface IUsers extends IList<IUserPreview> {}
export interface IPosts extends IList<IPostPreview> {}
export interface IComments extends IList<IComment> {}
