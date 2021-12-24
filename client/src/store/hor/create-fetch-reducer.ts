import {AnyAction} from 'redux';
import {ObjectUtils} from '../../utils';

export const enum FetchStatus {
  IDLE = `idle`,
  LOADING = `loading`,
  SUCCESS = `success`,
  ERROR = `error`,
  ABORTED = `aborted`,
}

export interface IFetchStore {
  status: FetchStatus;
  error: null | string;
  controller: null | AbortController;
}

export const createFetchReducer = (name: string) => {
  const REQUEST_STARTED = `${name}/fetch/REQUEST_STARTED`;
  const REQUEST_FINISHED = `${name}/fetch/REQUEST_FINISHED`;
  const REQUEST_FAILED = `${name}/fetch/REQUEST_FAILED`;
  const REQUEST_RESET = `${name}/fetch/REQUEST_RESET`;
  const REQUEST_ABORT = `${name}/fetch/REQUEST_ABORT`;

  const requestStart = (controller?: AbortController) => ({
    type: REQUEST_STARTED,
    payload: controller || null,
  });

  const requestFinished = () => ({
    type: REQUEST_FINISHED,
  });

  const requestFailed = (errMsg: string) => ({
    type: REQUEST_FAILED,
    payload: errMsg,
  });

  const requestReset = () => ({
    type: REQUEST_RESET,
  });

  const requestAbort = () => ({
    type: REQUEST_ABORT,
  });

  const actions = {
    requestStart,
    requestFinished,
    requestFailed,
    requestReset,
    requestAbort,
  };

  const initStore: IFetchStore = {
    status: FetchStatus.IDLE,
    error: null,
    controller: null,
  };

  const reducer = (state = initStore, action: AnyAction): IFetchStore => {
    switch (action.type) {
      case REQUEST_STARTED:
        return ObjectUtils.updateObject(state, {
          status: FetchStatus.LOADING,
          controller: action.payload,
        });

      case REQUEST_FINISHED:
        return ObjectUtils.updateObject(state, {
          status: FetchStatus.SUCCESS,
        });

      case REQUEST_FAILED:
        return ObjectUtils.updateObject(state, {
          status: FetchStatus.ERROR,
          error: action.payload,
        });

      case REQUEST_RESET:
        return ObjectUtils.updateObject(state, initStore);

      case REQUEST_ABORT:
        state.controller?.abort();
        return ObjectUtils.updateObject(state, {
          status: FetchStatus.ABORTED,
          controller: null,
        });

      default:
        return state;
    }
  };

  const getStatus = (store: IFetchStore) => store.status;
  const getIsLoading = (store: IFetchStore) => store.status === FetchStatus.LOADING;
  const getIsError = (store: IFetchStore) => store.status === FetchStatus.ERROR;
  const getError = (store: IFetchStore) => store.error;
  const selectors = {
    getStatus,
    getIsLoading,
    getIsError,
    getError,
  };

  return {
    actions,
    selectors,
    reducer,
  };
};
