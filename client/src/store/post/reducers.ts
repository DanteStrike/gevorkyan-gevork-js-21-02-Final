import {combineReducers} from 'redux';
import {fetchReducer, RequestType} from './slices/fetch';
import {itemReducer} from './slices/item';
import NameSpace from '../name-space';
import {IFetchStore, IListStore} from '../hor';
import {IComment, IPostPreview} from '../../types';
import {listReducer} from './slices/list';

const post = itemReducer;
const reducer = combineReducers({
  fetch: fetchReducer,
  post,
  comments: listReducer,
});
export interface IPostDuckStore {
  [NameSpace.POST]: {
    fetch: {
      [RequestType.LOAD_POST]: IFetchStore;
      [RequestType.LOAD_COMMENTS]: IFetchStore;
    };
    post: IPostPreview;
    comments: IListStore<IComment>;
  };
}
export default reducer;
