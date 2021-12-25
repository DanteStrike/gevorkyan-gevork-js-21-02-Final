import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {logger, RequestUtils} from '../utils';
import {LoggerMessages} from '../constants/loggerMessages';
import UserRepository from '../repositories/userRepository';
import {IPaginationParams, IPaginationQuery} from '../types/params';
import UserMapper from '../mappers/userMapper';
import {IUser, IUserRegistration, IUserUpdate} from '../types/user';
import {IPosts, IUsers} from '../types/lists';
import UserActions from '../actions/userActions';
import Service from './service';
import {DummyAPIConstants} from '../constants/dummyAPI';
import ListMapper from '../mappers/listMapper';

class UserService extends Service {
  static getUser(req: Request<{id: string}, any, any, {locale?: string}>, res: Response) {
    logger.info(LoggerMessages.UserService.GET_USER_INPUT_PARAMS, req.params.id, req.query.locale || ``);
    UserService.createCommonServerResponse(
      res,
      UserRepository.getUserByIDFromDummyAPI(req.params.id),
      (result) => {
        logger.info(LoggerMessages.UserService.GET_USER_SUCCESS, result.status, result.data);
      },
      (response) => {
        const {status} = response;
        const mappedData = UserMapper.normalizeUserForClient(response.data, req.query.locale);
        logger.info(LoggerMessages.UserService.GET_USER_NORMALIZED, mappedData);
        return {status, data: mappedData};
      },
      (err) => {
        logger.error(LoggerMessages.UserService.GET_USER_ERROR, err.status, err.data);
      }
    );
  }

  static getUsersList(req: Request<core.ParamsDictionary, IUsers, any, IPaginationQuery>, res: Response) {
    const pagParams: IPaginationParams = RequestUtils.getPaginationParams(req.query);
    logger.info(LoggerMessages.UserService.GET_USERS_LIST_INPUT_PARAMS, req.query, pagParams.limit, pagParams.page);
    UserService.createCommonServerResponse(
      res,
      UserRepository.getUsersListFromDummyAPI(pagParams.limit, pagParams.page),
      (result) => {
        logger.info(LoggerMessages.UserService.GET_USERS_LIST_SUCCESS, result.status, result.data);
      },
      null,
      (err) => {
        logger.error(LoggerMessages.UserService.GET_USERS_LIST_ERROR, err.status, err.data);
      }
    );
  }

  static createUser(req: Request<core.ParamsDictionary, IUser, IUserRegistration>, res: Response) {
    logger.info(LoggerMessages.UserService.CREATE_USER_INPUT_BODY, req.body);
    UserService.createCommonServerResponse(
      res,
      UserActions.createUserOnDummyAPI(req.body),
      (result) => {
        logger.info(LoggerMessages.UserService.CREATE_USER_SUCCESS, result.status, result.data);
      },
      null,
      (err) => {
        logger.error(LoggerMessages.UserService.CREATE_USER_ERROR, err.status, err.data);
      }
    );
  }

  static updateUser(req: Request<{id: string}, IUser, IUserUpdate>, res: Response) {
    logger.info(LoggerMessages.UserService.UPDATE_USER_INPUT_PARAMS, req.body, req.params);
    UserService.createCommonServerResponse(
      res,
      UserActions.updateUserOnDummyAPI(req.params.id, req.body),
      (result) => {
        logger.info(LoggerMessages.UserService.UPDATE_USER_SUCCESS, result.status, result.data);
      },
      null,
      (err) => {
        logger.error(LoggerMessages.UserService.UPDATE_USER_ERROR, err.status, err.data);
      }
    );
  }

  static getUserPosts(req: Request<{id: string}, IPosts, any, IPaginationQuery>, res: Response) {
    const pagParams: IPaginationParams = RequestUtils.getPaginationParams(req.query);
    const normalizedPagParams = RequestUtils.normalizePaginationQuery(
      pagParams.limit,
      pagParams.page,
      DummyAPIConstants.MIN_LIMIT
    );
    logger.info(
      LoggerMessages.UserService.GET_USER_POSTS_INPUT_PARAMS,
      req.params.id,
      req.query,
      pagParams,
      normalizedPagParams
    );
    UserService.createCommonServerResponse(
      res,
      UserRepository.getUserPostsFromDummyAPI(req.params.id, normalizedPagParams.limit, normalizedPagParams.page),
      (result) => {
        logger.info(LoggerMessages.UserService.GET_USER_POSTS_SUCCESS, result.status, result.data);
      },
      (response) => {
        const {status, data} = response;
        const mappedData: IPosts = ListMapper.normalizeList(data, pagParams, normalizedPagParams);
        logger.info(LoggerMessages.UserService.GET_USER_POSTS_NORMALIZED, mappedData);
        return {status, data: mappedData};
      },
      (err) => {
        logger.error(LoggerMessages.UserService.GET_USER_POSTS_ERROR, err.status, err.data);
      }
    );
  }
}

export default UserService;
