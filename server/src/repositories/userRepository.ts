import {AxiosResponse} from 'axios';
import {logger, dummyAPI} from '../utils';
import {LoggerMessages} from '../constants/loggerMessages';
import {IPosts, IUsers} from '../types/lists';
import {IUser} from '../types/user';
import ApiAxiosRepository from './apiAxiosRepository';

class UserRepository extends ApiAxiosRepository {
  static getUserByIDFromDummyAPI(id: string): Promise<AxiosResponse<IUser, any>> {
    const requestURL = `/user/${id}`;
    logger.info(LoggerMessages.UserRepository.GET_USER_BY_ID_FROM_DUMMY_API_START, requestURL);

    return UserRepository.createCommonAxiosRequest(
      dummyAPI.get<IUser>(requestURL),
      (response) => {
        logger.info(
          LoggerMessages.UserRepository.GET_USER_BY_ID_FROM_DUMMY_API_SUCCESS,
          response.status,
          response.data
        );
      },
      (error) => {
        logger.error(LoggerMessages.UserRepository.GET_USER_BY_ID_FROM_DUMMY_API_ERROR, error);
      }
    );
  }

  static getUserPostsFromDummyAPI(id: string, limit: number, page: number): Promise<AxiosResponse<IPosts, any>> {
    const requestURL = `/user/${id}/post?page=${page}&limit=${limit}`;
    logger.info(LoggerMessages.UserRepository.GET_USER_POSTS_FROM_DUMMY_API_START, requestURL);

    return UserRepository.createCommonAxiosRequest(
      dummyAPI.get<IPosts>(requestURL),
      (response) => {
        logger.info(
          LoggerMessages.UserRepository.GET_USER_POSTS_FROM_DUMMY_API_SUCCESS,
          response.status,
          response.data
        );
      },
      (error) => {
        logger.error(LoggerMessages.UserRepository.GET_USER_POSTS_FROM_DUMMY_API_ERROR, error);
      }
    );
  }

  static getUsersListFromDummyAPI(limit: number, page: number): Promise<AxiosResponse<IUsers, any>> {
    const requestURL = `/user?page=${page}&limit=${limit}`;
    logger.info(LoggerMessages.UserRepository.GET_USERS_LIST_FROM_DUMMY_API_START, requestURL);

    return UserRepository.createCommonAxiosRequest(
      dummyAPI.get<IUsers>(requestURL),
      (response) => {
        logger.info(
          LoggerMessages.UserRepository.GET_USERS_LIST_FROM_DUMMY_API_SUCCESS,
          response.status,
          response.data
        );
      },
      (error) => {
        logger.error(LoggerMessages.UserRepository.GET_USERS_LIST_FROM_DUMMY_API_ERROR, error);
      }
    );
  }
}

export default UserRepository;
