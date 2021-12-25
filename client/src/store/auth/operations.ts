import {AxiosInstance} from 'axios';
import i18next from '../../locale/i18next';
import actions from './actions';
import {IUser, IUserRegistration, IUserUpdate} from '../../types';
import {authStorageKey} from './types';
import {profileActions} from '../profile';
import {FetchErrorType} from '../../enums';

const login = (id: string) => (dispatch: any, _: any, api: AxiosInstance) => {
  const controller = new AbortController();

  api
    .get<IUser>(`/user/${id}`, {signal: controller.signal})
    .then((response) => {
      dispatch(actions.login(response.data.id, response.data.firstName, response.data.picture || ``));
      localStorage.setItem(authStorageKey, response.data.id);
      dispatch(actions.requestFinished());
    })
    .catch((err) => {
      if (err.response?.data?.error === FetchErrorType.PARAMS_NOT_VALID) {
        dispatch(actions.requestFailed(i18next.t(`error.network.notFoundID`)));
        dispatch(actions.logout());
      } else {
        dispatch(actions.requestFailed(err.message));
      }
    });
  dispatch(actions.requestStart(controller));
};

const registration = (data: IUserRegistration) => (dispatch: any, _: any, api: AxiosInstance) => {
  const controller = new AbortController();

  api
    .post<IUser>(`/user/create`, data, {signal: controller.signal})
    .then((response) => {
      dispatch(actions.login(response.data.id, response.data.firstName, response.data.picture || ``));
      localStorage.setItem(authStorageKey, response.data.id);
      dispatch(actions.requestFinished());
    })
    .catch((err) => {
      if (err.response?.data?.error === FetchErrorType.BODY_NOT_VALID && err.response?.data?.data?.email) {
        dispatch(actions.requestFailed(i18next.t(`error.network.emailExist`)));
      } else {
        dispatch(actions.requestFailed(err.message));
      }
    });

  dispatch(actions.requestStart(controller));
};

const update = (data: IUserUpdate) => (dispatch: any, _: any, api: AxiosInstance) => {
  const controller = new AbortController();

  api
    .put<IUser>(`/user/${data.id}`, data)
    .then((response) => {
      dispatch(actions.login(response.data.id, response.data.firstName, response.data.picture || ``));
      dispatch(profileActions.set(response.data));
      dispatch(actions.requestFinished());
    })
    .catch((err) => {
      dispatch(actions.requestFailed(err.message));
    });

  dispatch(actions.requestStart(controller));
};

export default {
  login,
  registration,
  update,
};
