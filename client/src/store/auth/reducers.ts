import {AnyAction, combineReducers} from 'redux';
import types from './types';
import {fetchReducer} from './slices/fetch';
import NameSpace from '../name-space';
import {IFetchStore} from '../hor';
import {ObjectUtils} from '../../utils';

export const enum AuthStatus {
  AUTHORIZED = `authorized`,
  UNAUTHORIZED = `unauthorized`,
  IDLE = `idle`,
}

const authStatusReducer = (state = AuthStatus.IDLE, action: AnyAction) => {
  switch (action.type) {
    case types.LOGIN:
      return AuthStatus.AUTHORIZED;

    case types.LOGOUT:
      return AuthStatus.UNAUTHORIZED;

    default:
      return state;
  }
};

interface IAuthUser {
  id: string;
  name: string;
  picture: string;
}
const authUserInitStore: IAuthUser = {id: ``, name: ``, picture: ``};
const authUserReducer = (state = authUserInitStore, action: AnyAction) => {
  switch (action.type) {
    case types.LOGIN:
      return ObjectUtils.updateObject(state, action.payload);

    case types.LOGOUT:
      return ObjectUtils.updateObject(state, authUserInitStore);

    default:
      return state;
  }
};

const status = authStatusReducer;
const reducers = combineReducers({
  fetch: fetchReducer,
  status,
  user: authUserReducer,
});
export interface IAuthDuckStore {
  [NameSpace.AUTH]: {
    fetch: IFetchStore;
    status: AuthStatus;
    user: IAuthUser;
  };
}
export default reducers;
