import {AxiosResponse} from 'axios';
import {dummyAPI, logger} from '../utils';
import {IComments, IPosts} from '../types/lists';
import {LoggerMessages} from '../constants/loggerMessages';
import {IPostPreview} from '../types/post';
import ApiAxiosRepository from './apiAxiosRepository';

class PostRepository extends ApiAxiosRepository {
  static getPostFromDummyAPI(id: string): Promise<AxiosResponse<IPostPreview, any>> {
    const requestURL = `/post/${id}`;
    logger.info(LoggerMessages.PostRepository.GET_POST_FROM_DUMMY_API_START, requestURL);

    return PostRepository.createCommonAxiosRequest(
      dummyAPI.get<IPostPreview>(requestURL),
      (response) => {
        logger.info(LoggerMessages.PostRepository.GET_POST_FROM_DUMMY_API_SUCCESS, response.status, response.data);
      },
      (error) => {
        logger.error(LoggerMessages.PostRepository.GET_POST_FROM_DUMMY_API_ERROR, error);
      }
    );
  }

  static getPostsFromDummyAPI(limit: number, page: number): Promise<AxiosResponse<IPosts, any>> {
    const requestURL = `/post?page=${page}&limit=${limit}`;
    logger.info(LoggerMessages.PostRepository.GET_POSTS_FROM_DUMMY_API_START, requestURL);

    return PostRepository.createCommonAxiosRequest(
      dummyAPI.get<IPosts>(requestURL),
      (response) => {
        logger.info(LoggerMessages.PostRepository.GET_POSTS_FROM_DUMMY_API_SUCCESS, response.status, response.data);
      },
      (error) => {
        logger.error(LoggerMessages.PostRepository.GET_POSTS_FROM_DUMMY_API_ERROR, error);
      }
    );
  }

  static getPostCommentsFromDummyAPI(id: string, limit: number, page: number): Promise<AxiosResponse<IComments, any>> {
    const requestURL = `/post/${id}/comment?page=${page}&limit=${limit}`;
    logger.info(LoggerMessages.PostRepository.GET_POST_COMMENTS_FROM_DUMMY_API_START, requestURL);

    return PostRepository.createCommonAxiosRequest(
      dummyAPI.get<IComments>(requestURL),
      (response) => {
        logger.info(
          LoggerMessages.PostRepository.GET_POST_COMMENTS_FROM_DUMMY_API_SUCCESS,
          response.status,
          response.data
        );
      },
      (error) => {
        logger.error(LoggerMessages.PostRepository.GET_POST_COMMENTS_FROM_DUMMY_API_ERROR, error);
      }
    );
  }
}

export default PostRepository;
