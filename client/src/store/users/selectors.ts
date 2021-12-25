import {IUsersDuckStore} from './reducers';
import NameSpace from '../name-space';
import {fetchSelectors} from './slices/fetch';
import {listSelectors} from './slices/list';

const getStoreSpace = (store: IUsersDuckStore) => store[NameSpace.USERS];

const getFetchSpace = (store: IUsersDuckStore) => getStoreSpace(store).fetch;
const getListSpace = (store: IUsersDuckStore) => getStoreSpace(store).list;

const getIsLoading = (store: IUsersDuckStore) => fetchSelectors.getIsLoading(getFetchSpace(store));
const getIsError = (store: IUsersDuckStore) => fetchSelectors.getIsError(getFetchSpace(store));
const getError = (store: IUsersDuckStore) => fetchSelectors.getError(getFetchSpace(store));

const getData = (store: IUsersDuckStore) => listSelectors.getData(getListSpace(store));
const getTotal = (store: IUsersDuckStore) => listSelectors.getTotal(getListSpace(store));
const getPage = (store: IUsersDuckStore) => listSelectors.getPage(getListSpace(store));

export default {
  getData,
  getTotal,
  getPage,
  getIsLoading,
  getIsError,
  getError,
};
