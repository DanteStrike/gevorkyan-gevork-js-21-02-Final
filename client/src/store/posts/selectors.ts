import {IPostsDuckStore} from './reducers';
import NameSpace from '../name-space';
import {fetchSelectors} from './slices/fetch';
import {listSelectors} from './slices/list';

const getStoreSpace = (store: IPostsDuckStore) => store[NameSpace.POSTS];

const getFetchSpace = (store: IPostsDuckStore) => getStoreSpace(store).fetch;
const getListSpace = (store: IPostsDuckStore) => getStoreSpace(store).list;

const getIsLoading = (store: IPostsDuckStore) => fetchSelectors.getIsLoading(getFetchSpace(store));
const getIsError = (store: IPostsDuckStore) => fetchSelectors.getIsError(getFetchSpace(store));
const getError = (store: IPostsDuckStore) => fetchSelectors.getError(getFetchSpace(store));

const getData = (store: IPostsDuckStore) => listSelectors.getData(getListSpace(store));
const getTotal = (store: IPostsDuckStore) => listSelectors.getTotal(getListSpace(store));
const getPage = (store: IPostsDuckStore) => listSelectors.getPage(getListSpace(store));

export default {
  getData,
  getTotal,
  getPage,
  getIsLoading,
  getIsError,
  getError,
};
