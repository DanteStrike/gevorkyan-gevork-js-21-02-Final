import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {logger, RequestUtils} from '../utils';
import {LoggerMessages} from '../constants/loggerMessages';
import PostRepository from '../repositories/postRepository';
import PostMapper from '../mappers/postMapper';
import {IComments, IPosts} from '../types/lists';
import {IPaginationParams, IPaginationQuery} from '../types/params';
import Service from './service';
import {DummyAPIConstants} from '../constants/dummyAPI';
import ListMapper from '../mappers/listMapper';

class PostService extends Service {
  static getPost(req: Request<{id: string}, any, any, {locale?: string}>, res: Response) {
    logger.info(LoggerMessages.PostService.GET_POST_INPUT_PARAMS, req.params.id, req.query.locale || ``);

    PostService.createCommonServerResponse(
      res,
      PostRepository.getPostFromDummyAPI(req.params.id),
      (response) => {
        logger.info(LoggerMessages.PostService.GET_POST_SUCCESS, response.status, response.data);
      },
      (response) => {
        const {status} = response;
        const mappedData = PostMapper.normalizeDateForClient(response.data, req.query.locale);
        logger.info(LoggerMessages.PostService.GET_POST_NORMALIZED, mappedData);
        return {status, data: mappedData};
      },
      (error) => {
        logger.error(LoggerMessages.PostService.GET_POST_ERROR, error.status, error.data);
      }
    );
  }

  static getPosts(
    req: Request<core.ParamsDictionary, IPosts, any, IPaginationQuery & {locale?: string}>,
    res: Response
  ) {
    const pagParams: IPaginationParams = RequestUtils.getPaginationParams(req.query);
    logger.info(
      LoggerMessages.PostService.GET_POSTS_LIST_INPUT_PARAMS,
      req.query,
      pagParams.limit,
      pagParams.page,
      req.query.locale || ``
    );

    PostService.createCommonServerResponse(
      res,
      PostRepository.getPostsFromDummyAPI(pagParams.limit, pagParams.page),
      (response) => {
        logger.info(LoggerMessages.PostService.GET_POSTS_LIST_SUCCESS, response.status, response.data);
      },
      (response) => {
        const {status, data} = response;
        const mappedData = PostMapper.normalizeDatesForClient(data.data, req.query.locale);
        logger.info(LoggerMessages.PostService.GET_POSTS_LIST_NORMALIZED, mappedData);
        return {status, data: {...data, data: mappedData}};
      },
      (error) => {
        logger.error(LoggerMessages.PostService.GET_POSTS_LIST_ERROR, error.status, error.data);
      }
    );
  }

  static getPostComments(
    req: Request<{id: string}, IComments, any, IPaginationQuery & {locale?: string}>,
    res: Response
  ) {
    const pagParams: IPaginationParams = RequestUtils.getPaginationParams(req.query);
    const normalizedPagParams = RequestUtils.normalizePaginationQuery(
      pagParams.limit,
      pagParams.page,
      DummyAPIConstants.MIN_LIMIT
    );
    logger.info(
      LoggerMessages.PostService.GET_POST_COMMENTS_INPUT_PARAMS,
      req.params.id,
      req.query,
      pagParams,
      normalizedPagParams
    );

    PostService.createCommonServerResponse(
      res,
      PostRepository.getPostCommentsFromDummyAPI(req.params.id, normalizedPagParams.limit, normalizedPagParams.page),
      (response) => {
        logger.info(LoggerMessages.PostService.GET_POST_COMMENTS_SUCCESS, response.status, response.data);
      },
      (response) => {
        const {status, data} = response;
        const mappedData: IComments = ListMapper.normalizeList(data, pagParams, normalizedPagParams);
        mappedData.data = PostMapper.normalizeDatesForClient(mappedData.data, req.query.locale);
        logger.info(LoggerMessages.PostService.GET_POST_COMMENTS_NORMALIZED, mappedData);
        return {status, data: mappedData};
      },
      (error) => {
        logger.error(LoggerMessages.PostService.GET_POST_COMMENTS_ERROR, error.status, error.data);
      }
    );
  }
}

export default PostService;
