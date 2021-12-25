import {Router} from 'express';
import UserService from '../services/userService';

const userRouter = Router();
userRouter.get(``, UserService.getUsersList);
userRouter.get(`/:id`, UserService.getUser);
userRouter.get(`/:id/post`, UserService.getUserPosts);
userRouter.post(`/create`, UserService.createUser);
userRouter.put(`/:id`, UserService.updateUser);

export default userRouter;
