import {Router} from 'express';
import CommonService from '../services/commonService';

const commonRouter = Router();

commonRouter.use(CommonService.getAppPathNotFoundError);

export default commonRouter;
