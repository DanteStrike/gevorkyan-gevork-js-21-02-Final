import {AuthStatus, IAuthDuckStore} from './reducers';
import NameSpace from '../name-space';
import {fetchSelectors} from './slices/fetch';

const getStoreSpace = (store: IAuthDuckStore) => store[NameSpace.AUTH];

const getFetchSpace = (store: IAuthDuckStore) => getStoreSpace(store).fetch;
const getStatusSpace = (store: IAuthDuckStore) => getStoreSpace(store).status;

const getIsLoading = (store: IAuthDuckStore) => fetchSelectors.getIsLoading(getFetchSpace(store));
const getIsError = (store: IAuthDuckStore) => fetchSelectors.getIsError(getFetchSpace(store));
const getError = (store: IAuthDuckStore) => fetchSelectors.getError(getFetchSpace(store));

const getIsAuth = (store: IAuthDuckStore) => getStatusSpace(store) === AuthStatus.AUTHORIZED;
const getIsAuthWait = (store: IAuthDuckStore) => getStatusSpace(store) === AuthStatus.IDLE;

const getAuthUser = (store: IAuthDuckStore) => getStoreSpace(store).user;
const getID = (store: IAuthDuckStore) => getAuthUser(store).id;

export default {
  getIsLoading,
  getIsError,
  getError,
  getIsAuth,
  getAuthUser,
  getID,
  getIsAuthWait,
};
