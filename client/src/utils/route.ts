import {RoutePath} from '../enums';

const createProfileRoute = (id: string) => `${RoutePath.PROFILE}/${id}`;
const createProfileEditRoute = (id: string) => `${createProfileRoute(id)}/edit`;
const createProfilePostRoute = (profileId: string, postId: string) => `${createProfileRoute(profileId)}/${postId}`;
const createPostsPost = (postId: string) => `${RoutePath.POSTS}/${postId}`;

export default {
  createProfileRoute,
  createProfileEditRoute,
  createProfilePostRoute,
  createPostsPost,
};
