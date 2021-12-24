import types, {authStorageKey} from './types';
import {fetchActions} from './slices/fetch';

const login = (id: string, name: string, picture: string) => ({
  type: types.LOGIN,
  payload: {
    id,
    picture,
    name,
  },
});

const logout = () => {
  localStorage.setItem(authStorageKey, ``);

  return {
    type: types.LOGOUT,
  };
};

const actions = {
  login,
  logout,
  ...fetchActions,
};

export default actions;
