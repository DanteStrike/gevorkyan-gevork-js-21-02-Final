import {combineReducers} from 'redux';
import NameSpace from '../name-space';
import {fetchReducer} from './slices/fetch';
import {IFetchStore, IListStore} from '../hor';
import {listReducer} from './slices/list';
import {IUserPreview} from '../../types';

const reducer = combineReducers({
  fetch: fetchReducer,
  list: listReducer,
});
export interface IUsersDuckStore {
  [NameSpace.USERS]: {
    fetch: IFetchStore;
    list: IListStore<IUserPreview>;
  };
}
export default reducer;
