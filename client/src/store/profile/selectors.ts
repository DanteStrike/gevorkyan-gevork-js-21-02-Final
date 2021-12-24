import NameSpace from '../name-space';
import {IProfileDuckStore} from './reducers';
import {itemSelectors} from './slices/item';
import {fetchSelectors, RequestType} from './slices/fetch';
import {listSelectors} from './slices/list';

const getStoreSpace = (store: IProfileDuckStore) => store[NameSpace.PROFILE];

const getFetchSpace = (store: IProfileDuckStore, requestType: RequestType) => getStoreSpace(store).fetch[requestType];
const getUserSpace = (store: IProfileDuckStore) => getStoreSpace(store).user;
const getUserPostsSpace = (store: IProfileDuckStore) => getStoreSpace(store).posts;

const getProfile = (store: IProfileDuckStore) => itemSelectors.getItem(getUserSpace(store));

const getPosts = (store: IProfileDuckStore) => listSelectors.getData(getUserPostsSpace(store));
const getTotal = (store: IProfileDuckStore) => listSelectors.getTotal(getUserPostsSpace(store));
const getPage = (store: IProfileDuckStore) => listSelectors.getPage(getUserPostsSpace(store));

const getProfileIsLoading = (store: IProfileDuckStore, requestType = RequestType.LOAD_PROFILE) =>
  fetchSelectors[requestType].getIsLoading(getFetchSpace(store, requestType));
const getProfileIsError = (store: IProfileDuckStore, requestType = RequestType.LOAD_PROFILE) =>
  fetchSelectors[requestType].getIsError(getFetchSpace(store, requestType));
const getProfileError = (store: IProfileDuckStore, requestType = RequestType.LOAD_PROFILE) =>
  fetchSelectors[requestType].getError(getFetchSpace(store, requestType));

const getUserPostsIsLoading = (store: IProfileDuckStore, requestType = RequestType.LOAD_USER_POSTS) =>
  fetchSelectors[requestType].getIsLoading(getFetchSpace(store, requestType));
const getUserPostsIsError = (store: IProfileDuckStore, requestType = RequestType.LOAD_USER_POSTS) =>
  fetchSelectors[requestType].getIsError(getFetchSpace(store, requestType));
const getUserPostsError = (store: IProfileDuckStore, requestType = RequestType.LOAD_USER_POSTS) =>
  fetchSelectors[requestType].getError(getFetchSpace(store, requestType));

export default {
  getProfile,
  getPosts,
  getTotal,
  getPage,
  getProfileIsLoading,
  getProfileIsError,
  getProfileError,
  getUserPostsIsLoading,
  getUserPostsIsError,
  getUserPostsError,
};
