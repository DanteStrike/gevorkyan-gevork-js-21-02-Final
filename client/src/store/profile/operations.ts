import {AxiosInstance} from 'axios';
import actions from './actions';
import i18next from '../../locale/i18next';
import {IPosts, IUser} from '../../types';
import {FetchErrorType} from '../../enums';
import {RequestType} from './slices/fetch';

const loadProfile = (id: string) => (dispatch: any, getState: any, api: AxiosInstance) => {
  const controller = new AbortController();

  api
    .get<IUser>(`/user/${id}?locale=${i18next.resolvedLanguage}`, {signal: controller.signal})
    .then((response) => {
      dispatch(actions.set(response.data));
      dispatch(actions.fetchActions[RequestType.LOAD_PROFILE].requestFinished());
    })
    .catch((err) => {
      if (err.response?.data?.error === FetchErrorType.PARAMS_NOT_VALID) {
        dispatch(
          actions.fetchActions[RequestType.LOAD_PROFILE].requestFailed(i18next.t(`error.network.notFoundProfile`))
        );
      } else {
        dispatch(actions.fetchActions[RequestType.LOAD_PROFILE].requestFailed(err.message));
      }
    });
  dispatch(actions.fetchActions[RequestType.LOAD_PROFILE].requestStart(controller));
};

const loadUserPosts =
  (id: string, limit: number, page: number) => (dispatch: any, getState: any, api: AxiosInstance) => {
    const controller = new AbortController();

    api
      .get<IPosts>(`/user/${id}/post?page=${page - 1}&limit=${limit}`, {
        signal: controller.signal,
      })
      .then((response) => {
        dispatch(actions.setup(response.data));
        dispatch(actions.fetchActions[RequestType.LOAD_USER_POSTS].requestFinished());
      })
      .catch((err) => {
        if (err.response?.data?.error === FetchErrorType.PARAMS_NOT_VALID) {
          dispatch(
            actions.fetchActions[RequestType.LOAD_USER_POSTS].requestFailed(i18next.t(`error.network.notFoundProfile`))
          );
        } else {
          dispatch(actions.fetchActions[RequestType.LOAD_USER_POSTS].requestFailed(err.message));
        }
      });
    dispatch(actions.fetchActions[RequestType.LOAD_USER_POSTS].requestStart(controller));
  };

export default {
  loadProfile,
  loadUserPosts,
};
