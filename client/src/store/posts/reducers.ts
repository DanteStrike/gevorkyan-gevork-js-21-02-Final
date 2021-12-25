import {combineReducers} from 'redux';
import NameSpace from '../name-space';
import {fetchReducer} from './slices/fetch';
import {IFetchStore, IListStore} from '../hor';
import {listReducer} from './slices/list';
import {IPostPreview} from '../../types';

const reducer = combineReducers({
  fetch: fetchReducer,
  list: listReducer,
});
export interface IPostsDuckStore {
  [NameSpace.POSTS]: {
    fetch: IFetchStore;
    list: IListStore<IPostPreview>;
  };
}
export default reducer;
