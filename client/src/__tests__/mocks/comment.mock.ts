import {IComment, IComments} from '../../types';
import {userOne, userTwo} from './user.mock';

export const commentOne: IComment = {
  id: `commentID_1`,
  message: `message`,
  owner: userOne,
  post: `post`,
  publishDate: `un-normalized`,
};

export const commentTwo: IComment = {
  id: `commentID_2`,
  message: `message`,
  owner: userTwo,
  post: `post`,
  publishDate: `un-normalized`,
};

export const comments: IComments = {
  data: [commentOne, commentTwo],
  page: 0,
  limit: 5,
  total: 2,
};
