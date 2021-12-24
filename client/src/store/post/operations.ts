import {AxiosInstance} from 'axios';
import actions from './actions';
import i18next from '../../locale/i18next';
import {IComments, IPostPreview} from '../../types';
import {FetchErrorType} from '../../enums';
import {RequestType} from './slices/fetch';

const loadPost = (id: string) => (dispatch: any, getState: any, api: AxiosInstance) => {
  const controller = new AbortController();

  api
    .get<IPostPreview>(`/post/${id}?locale=${i18next.resolvedLanguage}`, {signal: controller.signal})
    .then((response) => {
      dispatch(actions.set(response.data));
      dispatch(actions.fetchActions[RequestType.LOAD_POST].requestFinished());
    })
    .catch((err) => {
      if (err.response?.data?.error === FetchErrorType.PARAMS_NOT_VALID) {
        dispatch(actions.fetchActions[RequestType.LOAD_POST].requestFailed(i18next.t(`error.network.notFoundPost`)));
      } else {
        dispatch(actions.fetchActions[RequestType.LOAD_POST].requestFailed(err.message));
      }
    });
  dispatch(actions.fetchActions[RequestType.LOAD_POST].requestStart(controller));
};

const loadComments =
  (id: string, limit: number, page: number) => (dispatch: any, getState: any, api: AxiosInstance) => {
    const controller = new AbortController();

    api
      .get<IComments>(`/post/${id}/comment?page=${page - 1}&limit=${limit}&locale=${i18next.resolvedLanguage}`, {
        signal: controller.signal,
      })
      .then((response) => {
        dispatch(actions.setup(response.data));
        dispatch(actions.fetchActions[RequestType.LOAD_COMMENTS].requestFinished());
      })
      .catch((err) => {
        if (err.response?.data?.error === FetchErrorType.PARAMS_NOT_VALID) {
          dispatch(
            actions.fetchActions[RequestType.LOAD_COMMENTS].requestFailed(i18next.t(`error.network.notFoundPost`))
          );
        } else {
          dispatch(actions.fetchActions[RequestType.LOAD_COMMENTS].requestFailed(err.message));
        }
      });
    dispatch(actions.fetchActions[RequestType.LOAD_COMMENTS].requestStart(controller));
  };

export default {
  loadPost,
  loadComments,
};
