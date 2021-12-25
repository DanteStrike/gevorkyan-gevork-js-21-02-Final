import MockAdapter from 'axios-mock-adapter';
import dummyAPI from '../../utils/axios';
import logger from '../../utils/logger';
import UserRepository from '../../repositories/userRepository';

describe(`class UserRepository should work correctly`, () => {
  let getApiSpy: jest.SpyInstance;
  let mockAxiosRes: MockAdapter;

  beforeEach(() => {
    getApiSpy = jest.spyOn(dummyAPI, 'get');
    mockAxiosRes = new MockAdapter(dummyAPI);
    logger.info = jest.fn();
    logger.error = jest.fn();
  });

  it(`getUserByIDFromDummyAPI success res test`, () => {
    mockAxiosRes.onGet(`/user/anyID`).reply(200, {});

    UserRepository.getUserByIDFromDummyAPI(`anyID`).then(() => {
      expect(logger.info).toHaveBeenCalledTimes(2);
      expect(logger.error).toHaveBeenCalledTimes(0);
    });
    expect(getApiSpy).toHaveBeenCalledWith(`/user/anyID`);
  });

  it(`getUserByIDFromDummyAPI error res test`, () => {
    mockAxiosRes.onGet(`/user/errorID`).reply(500, {});

    UserRepository.getUserByIDFromDummyAPI(`errorID`).catch(() => {
      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledTimes(1);
    });
    expect(getApiSpy).toHaveBeenCalledWith(`/user/errorID`);
  });

  it(`getUserPostsFromDummyAPI success res test`, () => {
    mockAxiosRes.onGet(`/user/anyID/post?page=20&limit=10`).reply(200, {});

    UserRepository.getUserPostsFromDummyAPI(`anyID`, 10, 20).then(() => {
      expect(logger.info).toHaveBeenCalledTimes(2);
      expect(logger.error).toHaveBeenCalledTimes(0);
    });
    expect(getApiSpy).toHaveBeenCalledWith(`/user/anyID/post?page=20&limit=10`);
  });

  it(`getUserPostsFromDummyAPI error res test`, () => {
    mockAxiosRes.onGet(`/user/errorID/post?page=0&limit=0`).reply(500, {});

    UserRepository.getUserPostsFromDummyAPI(`errorID`, 0, 0).catch(() => {
      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledTimes(1);
    });
    expect(getApiSpy).toHaveBeenCalledWith(`/user/errorID/post?page=0&limit=0`);
  });

  it(`getUsersListFromDummyAPI success res test`, () => {
    mockAxiosRes.onGet(`/user?page=1&limit=5`).reply(200, {});

    UserRepository.getUsersListFromDummyAPI(5, 1).then(() => {
      expect(logger.info).toHaveBeenCalledTimes(2);
      expect(logger.error).toHaveBeenCalledTimes(0);
    });
    expect(getApiSpy).toHaveBeenCalledWith(`/user?page=1&limit=5`);
  });

  it(`getUsersListFromDummyAPI error res test`, () => {
    mockAxiosRes.onGet(`/user?page=1&limit=5`).reply(500, {});

    UserRepository.getUsersListFromDummyAPI(5, 1).catch(() => {
      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledTimes(1);
    });
    expect(getApiSpy).toHaveBeenCalledWith(`/user?page=1&limit=5`);
  });
});
