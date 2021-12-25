import {Router} from 'express';
import commonRouter from './commonRouter';
import userRouter from './userRouter';
import postRouter from './postRouter';

const APIRouter = Router();
APIRouter.use(`/user`, userRouter);
APIRouter.use(`/post`, postRouter);

const router = Router();
router.use(`/api`, APIRouter);
router.use(`*`, commonRouter);

export default router;
