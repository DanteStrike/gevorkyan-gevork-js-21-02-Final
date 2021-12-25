import {IUserPreview} from './user';

export interface IComment {
  id: string;
  message: string;
  owner: IUserPreview;
  post: string;
  publishDate: string;
}
