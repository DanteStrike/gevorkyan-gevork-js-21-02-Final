import NameSpace from '../name-space';
import {IPostDuckStore} from './reducers';
import {itemSelectors} from './slices/item';
import {fetchSelectors, RequestType} from './slices/fetch';
import {listSelectors} from './slices/list';

const getStoreSpace = (store: IPostDuckStore) => store[NameSpace.POST];

const getFetchSpace = (store: IPostDuckStore, requestType: RequestType) => getStoreSpace(store).fetch[requestType];
const getPostSpace = (store: IPostDuckStore) => getStoreSpace(store).post;
const getCommentsSpace = (store: IPostDuckStore) => getStoreSpace(store).comments;

const getPost = (store: IPostDuckStore) => itemSelectors.getItem(getPostSpace(store));

const getComments = (store: IPostDuckStore) => listSelectors.getData(getCommentsSpace(store));
const getTotal = (store: IPostDuckStore) => listSelectors.getTotal(getCommentsSpace(store));
const getPage = (store: IPostDuckStore) => listSelectors.getPage(getCommentsSpace(store));

const getPostIsLoading = (store: IPostDuckStore, requestType = RequestType.LOAD_POST) =>
  fetchSelectors[requestType].getIsLoading(getFetchSpace(store, requestType));
const getPostIsError = (store: IPostDuckStore, requestType = RequestType.LOAD_POST) =>
  fetchSelectors[requestType].getIsError(getFetchSpace(store, requestType));
const getPostError = (store: IPostDuckStore, requestType = RequestType.LOAD_POST) =>
  fetchSelectors[requestType].getError(getFetchSpace(store, requestType));

const getCommentsIsLoading = (store: IPostDuckStore, requestType = RequestType.LOAD_COMMENTS) =>
  fetchSelectors[requestType].getIsLoading(getFetchSpace(store, requestType));
const getCommentsIsError = (store: IPostDuckStore, requestType = RequestType.LOAD_COMMENTS) =>
  fetchSelectors[requestType].getIsError(getFetchSpace(store, requestType));
const getCommentsError = (store: IPostDuckStore, requestType = RequestType.LOAD_COMMENTS) =>
  fetchSelectors[requestType].getError(getFetchSpace(store, requestType));

export default {
  getPost,
  getComments,
  getTotal,
  getPage,
  getPostIsLoading,
  getPostIsError,
  getPostError,
  getCommentsIsLoading,
  getCommentsIsError,
  getCommentsError,
};
