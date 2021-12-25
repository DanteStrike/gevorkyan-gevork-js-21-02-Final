import {AnyAction} from 'redux';

export interface IItemStore<T> {
  item: T;
}

export const createItemReducer = <T>(name: string, initItem: T) => {
  const SET = `${name}/item/SET`;
  const RESET = `${name}/item/RESET`;

  const set = (data: T) => ({
    type: SET,
    payload: data,
  });

  const reset = () => ({
    type: RESET,
  });

  const actions = {
    set,
    reset,
  };

  const reducer = (state = initItem, action: AnyAction): T => {
    if (action.type === SET) {
      return action.payload;
    }

    if (action.type === RESET) {
      return initItem;
    }

    return state;
  };

  const getItem = (item: T) => item;
  const selectors = {
    getItem,
  };

  return {
    actions,
    selectors,
    reducer,
  };
};
