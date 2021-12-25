import NameSpace from '../../name-space';
import {createFetchReducer} from '../../hor';

const fetch = createFetchReducer(`${[NameSpace.USERS]}`);
const fetchActions = fetch.actions;
const fetchSelectors = fetch.selectors;
const fetchReducer = fetch.reducer;

export {fetchActions, fetchSelectors, fetchReducer};
