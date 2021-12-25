import MockAdapter from 'axios-mock-adapter';
import dummyAPI from '../../utils/axios';
import logger from '../../utils/logger';
import UserActions from '../../actions/userActions';
import {IUserRegistration, IUserUpdate} from '../../types/user';

describe(`class UserActions should work correctly`, () => {
  let postApiSpy: jest.SpyInstance;
  let putApiSpy: jest.SpyInstance;
  let mockAxiosRes: MockAdapter;

  beforeEach(() => {
    postApiSpy = jest.spyOn(dummyAPI, 'post');
    putApiSpy = jest.spyOn(dummyAPI, 'put');
    mockAxiosRes = new MockAdapter(dummyAPI);
    logger.info = jest.fn();
    logger.error = jest.fn();
  });

  it(`createUserOnDummyAPI success res test`, () => {
    mockAxiosRes.onPost(`/user/create`).reply(200, {response: {data: `created user data`}});

    UserActions.createUserOnDummyAPI(`user data for create` as unknown as IUserRegistration).then(() => {
      expect(logger.info).toHaveBeenCalledTimes(2);
      expect(logger.error).toHaveBeenCalledTimes(0);
    });

    expect(postApiSpy).toHaveBeenCalledWith(`/user/create`, `user data for create`);
  });

  it(`createUserOnDummyAPI error res test`, () => {
    mockAxiosRes.onPost(`/user/create`).reply(500, {});

    UserActions.createUserOnDummyAPI(`user data for create` as unknown as IUserRegistration).catch(() => {
      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledTimes(1);
    });

    expect(postApiSpy).toHaveBeenCalledWith(`/user/create`, `user data for create`);
  });

  it(`updateUserOnDummyAPI success res test`, () => {
    mockAxiosRes.onPut(`/user/userID`).reply(200, {response: {data: `updated user data`}});

    UserActions.updateUserOnDummyAPI(`userID`, `user data for update` as unknown as IUserUpdate).then(() => {
      expect(logger.info).toHaveBeenCalledTimes(2);
      expect(logger.error).toHaveBeenCalledTimes(0);
    });

    expect(putApiSpy).toHaveBeenCalledWith(`/user/userID`, `user data for update`);
  });

  it(`updateUserOnDummyAPI error res test`, () => {
    mockAxiosRes.onPut(`/user/errorID`).reply(500, {});

    UserActions.updateUserOnDummyAPI(`errorID`, `user data for update` as unknown as IUserUpdate).catch(() => {
      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledTimes(1);
    });

    expect(putApiSpy).toHaveBeenCalledWith(`/user/errorID`, `user data for update`);
  });
});
