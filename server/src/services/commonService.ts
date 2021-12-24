import {NextFunction, Request, Response} from 'express';
import ErrorMessages from '../constants/errorMessages';
import {logger} from '../utils';
import {LoggerMessages} from '../constants/loggerMessages';

class CommonService {
  static getAppPathNotFoundError(req: Request, res: Response) {
    logger.error(LoggerMessages.CommonService.PATH_NOT_FOUND, req.originalUrl);
    res.status(404).json({error: ErrorMessages.PATH_NOT_FOUND});
  }

  static getUnexpectedServerError(err: any, req: Request, res: Response, next: NextFunction) {
    logger.fatal(LoggerMessages.CommonService.INTERNAL_SERVER_ERROR, err);
    res.status(500).json({error: ErrorMessages.INTERNAL_SERVER_ERROR});
    next();
  }
}

export default CommonService;
