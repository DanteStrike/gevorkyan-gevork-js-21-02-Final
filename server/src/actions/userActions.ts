import {AxiosError, AxiosResponse} from 'axios';
import {IUser, IUserRegistration, IUserUpdate} from '../types/user';
import {dummyAPI, logger} from '../utils';
import {LoggerMessages} from '../constants/loggerMessages';

class UserActions {
  static createUserOnDummyAPI(data: IUserRegistration): Promise<AxiosResponse<IUser, any>> {
    const requestURL = `/user/create`;
    logger.info(LoggerMessages.UserActions.CREATE_USER_ON_DUMMY_API_START, requestURL, data);

    return dummyAPI
      .post<IUser>(requestURL, data)
      .then((response) => {
        logger.info(LoggerMessages.UserActions.CREATE_USER_ON_DUMMY_API_SUCCESS, response.status, response.data);
        return response;
      })
      .catch((error: AxiosError | Error) => {
        logger.error(LoggerMessages.UserActions.CREATE_USER_ON_DUMMY_API_ERROR, error);
        return Promise.reject(error);
      });
  }

  static updateUserOnDummyAPI(id: string, data: IUserUpdate): Promise<AxiosResponse<IUser, any>> {
    const requestURL = `/user/${id}`;
    logger.info(LoggerMessages.UserActions.UPDATE_USER_ON_DUMMY_API_START, requestURL, data);

    return dummyAPI
      .put<IUser>(requestURL, data)
      .then((response) => {
        logger.info(LoggerMessages.UserActions.UPDATE_USER_ON_DUMMY_API_SUCCESS, response.status, response.data);
        return response;
      })
      .catch((error: AxiosError) => {
        logger.error(LoggerMessages.UserActions.UPDATE_USER_ON_DUMMY_API_ERROR, error);
        return Promise.reject(error);
      });
  }
}

export default UserActions;
