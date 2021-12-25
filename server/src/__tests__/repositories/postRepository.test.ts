import MockAdapter from 'axios-mock-adapter';
import PostRepository from '../../repositories/postRepository';
import dummyAPI from '../../utils/axios';
import logger from '../../utils/logger';

describe(`class PostRepository should work correctly`, () => {
  let getApiSpy: jest.SpyInstance;
  let mockAxiosRes: MockAdapter;

  beforeEach(() => {
    getApiSpy = jest.spyOn(dummyAPI, 'get');
    mockAxiosRes = new MockAdapter(dummyAPI);
    logger.info = jest.fn();
    logger.error = jest.fn();
  });

  it(`getPostFromDummyAPI success res test`, () => {
    mockAxiosRes.onGet(`/post/anyID`).reply(200, {});

    PostRepository.getPostFromDummyAPI(`anyID`).then(() => {
      expect(logger.info).toHaveBeenCalledTimes(2);
      expect(logger.error).toHaveBeenCalledTimes(0);
    });
    expect(getApiSpy).toHaveBeenCalledWith(`/post/anyID`);
  });

  it(`getPostFromDummyAPI error res test`, () => {
    mockAxiosRes.onGet(`/post/errorID`).reply(500, {});

    PostRepository.getPostFromDummyAPI(`errorID`).catch(() => {
      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledTimes(1);
    });
    expect(getApiSpy).toHaveBeenCalledWith(`/post/errorID`);
  });

  it(`getPostsFromDummyAPI success res test`, () => {
    mockAxiosRes.onGet(`/post?page=100&limit=50`).reply(200, {});

    PostRepository.getPostsFromDummyAPI(50, 100).then(() => {
      expect(logger.info).toHaveBeenCalledTimes(2);
      expect(logger.error).toHaveBeenCalledTimes(0);
    });
    expect(getApiSpy).toHaveBeenCalledWith(`/post?page=100&limit=50`);
  });

  it(`getPostsFromDummyAPI error res test`, () => {
    mockAxiosRes.onGet(`/post?page=100&limit=50`).reply(500, {});

    PostRepository.getPostsFromDummyAPI(0, 0).catch(() => {
      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledTimes(1);
    });
  });

  it(`getPostCommentsFromDummyAPI success res test`, () => {
    mockAxiosRes.onGet(`/post/anyID/comment?page=100&limit=50`).reply(200, {});

    PostRepository.getPostCommentsFromDummyAPI(`anyID`, 50, 100).then(() => {
      expect(logger.info).toHaveBeenCalledTimes(2);
      expect(logger.error).toHaveBeenCalledTimes(0);
    });
    expect(getApiSpy).toHaveBeenCalledWith(`/post/anyID/comment?page=100&limit=50`);
  });

  it(`getPostCommentsFromDummyAPI error res test`, () => {
    mockAxiosRes.onGet(`/post/errorID/comment?page=0&limit=0`).reply(500, {});

    PostRepository.getPostCommentsFromDummyAPI(`errorID`, 0, 0).catch(() => {
      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledTimes(1);
    });
    expect(getApiSpy).toHaveBeenCalledWith(`/post/errorID/comment?page=0&limit=0`);
  });
});
