import {IUserPreview} from './user';

export interface IPostPreview {
  id: string;
  text: string;
  image: string;
  publishDate: string;
  owner: IUserPreview;
}
