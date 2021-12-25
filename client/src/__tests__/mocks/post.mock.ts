import {IPostPreview, IPosts} from '../../types';
import {userOne, userTwo} from './user.mock';

export const postOne: IPostPreview = {
  id: `postID_1`,
  text: `postText`,
  image: `postIMG_URL`,
  publishDate: `un-normalized`,
  owner: userOne,
};

export const postTwo: IPostPreview = {
  id: `postID_2`,
  text: `postText`,
  image: `postIMG_URL`,
  publishDate: `un-normalized`,
  owner: userOne,
};

export const postThree: IPostPreview = {
  id: `postID_3`,
  text: `postText`,
  image: `postIMG_URL`,
  publishDate: `un-normalized`,
  owner: userTwo,
};

export const posts: IPosts = {
  data: [postOne, postTwo, postThree],
  limit: 5,
  page: 0,
  total: 3,
};
