import {combineReducers} from 'redux';
import {fetchReducer, RequestType} from './slices/fetch';
import {itemReducer} from './slices/item';
import NameSpace from '../name-space';
import {IFetchStore, IListStore} from '../hor';
import {IPostPreview, IUser} from '../../types';
import {listReducer} from './slices/list';

const user = itemReducer;
const reducer = combineReducers({
  fetch: fetchReducer,
  user,
  posts: listReducer,
});
export interface IProfileDuckStore {
  [NameSpace.PROFILE]: {
    fetch: {
      [RequestType.LOAD_PROFILE]: IFetchStore;
      [RequestType.LOAD_USER_POSTS]: IFetchStore;
    };
    user: IUser;
    posts: IListStore<IPostPreview>;
  };
}
export default reducer;
