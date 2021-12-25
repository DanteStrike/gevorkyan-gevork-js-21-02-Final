import {Router} from 'express';
import PostService from '../services/postService';

const postRouter = Router();
postRouter.get(``, PostService.getPosts);
postRouter.get(`/:id`, PostService.getPost);
postRouter.get(`/:id/comment`, PostService.getPostComments);

export default postRouter;
