import MockAdapter from 'axios-mock-adapter';
import {authActions, authOperations, authReducer} from '../../../store/auth';
import types from '../../../store/auth/types';
import configureAPI from '../../../server/cofigure-api';
import {fullUser} from '../../mocks/user.mock';
import sleep from '../../mocks/utils';
import {FetchErrorType} from '../../../enums';
import {IUserRegistration, IUserUpdate} from '../../../types';
import {profileActions} from '../../../store/profile';

describe(`Auth slice should work correctly`, () => {
  describe(`actions test`, () => {
    it(`login`, () => {
      expect(authActions.login(`userID`, `userName`, `userPic`)).toStrictEqual({
        type: types.LOGIN,
        payload: {
          id: `userID`,
          picture: `userPic`,
          name: `userName`,
        },
      });
    });

    it(`logout`, () => {
      expect(authActions.logout()).toStrictEqual({type: types.LOGOUT});
    });
  });

  describe(`reducer test`, () => {
    it(`initState`, () => {
      expect(authReducer(undefined, {type: `any`})).toMatchObject({
        status: `idle`,
        user: {id: ``, name: ``, picture: ``},
      });
    });

    it(`actions`, () => {
      const storeStep = authReducer(undefined, authActions.login(`userID`, `userName`, `userPic`));
      expect(storeStep).toMatchObject({
        status: `authorized`,
        user: {id: `userID`, name: `userName`, picture: `userPic`},
      });

      expect(authReducer(storeStep, authActions.logout())).toMatchObject({
        status: `unauthorized`,
        user: {id: ``, name: ``, picture: ``},
      });
    });
  });

  describe(`operations test`, () => {
    const api = configureAPI();
    const dispatch = jest.fn();
    const getStore = jest.fn();

    let apiMock: any;
    beforeEach(() => {
      jest.resetAllMocks();
      apiMock = new MockAdapter(api);
    });

    it(`login`, async () => {
      const loginLoader = authOperations.login(`userID`);
      authActions.login = jest.fn();
      authActions.logout = jest.fn();
      authActions.requestStart = jest.fn();
      authActions.requestFinished = jest.fn();
      authActions.requestFailed = jest.fn();

      apiMock.onGet(`/user/userID`).reply(200, fullUser);

      loginLoader(dispatch, getStore, api);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(authActions.requestStart).toHaveBeenCalledTimes(1);

      jest.resetAllMocks();
      await sleep();
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(authActions.login).toHaveBeenCalledTimes(1);
      expect(authActions.requestFinished).toHaveBeenCalledTimes(1);

      apiMock.onGet(`/user/userID`).reply(404, {error: FetchErrorType.PARAMS_NOT_VALID});

      loginLoader(dispatch, getStore, api);
      jest.resetAllMocks();
      await sleep();
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(authActions.requestFailed).toHaveBeenCalledTimes(1);
      expect(authActions.logout).toHaveBeenCalledTimes(1);

      apiMock.onGet(`/user/userID`).reply(404, {error: `any`});

      loginLoader(dispatch, getStore, api);
      jest.resetAllMocks();
      await sleep();
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(authActions.requestFailed).toHaveBeenCalledTimes(1);
    });

    it(`registration`, async () => {
      const regLoader = authOperations.registration({data: `regUserData`} as unknown as IUserRegistration);
      authActions.login = jest.fn();
      authActions.requestStart = jest.fn();
      authActions.requestFinished = jest.fn();
      authActions.requestFailed = jest.fn();

      apiMock.onPost(`/user/create`).reply(200, fullUser);

      regLoader(dispatch, getStore, api);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(authActions.requestStart).toHaveBeenCalledTimes(1);

      jest.resetAllMocks();
      await sleep();
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(authActions.login).toHaveBeenCalledTimes(1);
      expect(authActions.requestFinished).toHaveBeenCalledTimes(1);

      apiMock.onPost(`/user/create`).reply(404, {error: FetchErrorType.PARAMS_NOT_VALID});

      regLoader(dispatch, getStore, api);
      jest.resetAllMocks();
      await sleep();
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(authActions.requestFailed).toHaveBeenCalledTimes(1);

      apiMock.onPost(`/user/create`).reply(500, {error: FetchErrorType.BODY_NOT_VALID, data: {email: `err`}});

      regLoader(dispatch, getStore, api);
      jest.resetAllMocks();
      await sleep();
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(authActions.requestFailed).toHaveBeenCalledTimes(1);
    });

    it(`update`, async () => {
      const updLoader = authOperations.update({id: `userID`, data: `updUserData`} as unknown as IUserUpdate);

      authActions.login = jest.fn();
      profileActions.set = jest.fn();
      authActions.requestStart = jest.fn();
      authActions.requestFinished = jest.fn();
      authActions.requestFailed = jest.fn();

      apiMock.onPut(`/user/userID`).reply(200, fullUser);

      updLoader(dispatch, getStore, api);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(authActions.requestStart).toHaveBeenCalledTimes(1);

      jest.resetAllMocks();
      await sleep();
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(authActions.login).toHaveBeenCalledTimes(1);
      expect(profileActions.set).toHaveBeenCalledTimes(1);
      expect(authActions.requestFinished).toHaveBeenCalledTimes(1);

      apiMock.onPut(`/user/userID`).reply(404);

      updLoader(dispatch, getStore, api);
      jest.resetAllMocks();
      await sleep();
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(authActions.requestFailed).toHaveBeenCalledTimes(1);
    });
  });
});
