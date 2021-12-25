import {combineReducers} from 'redux';
import NameSpace from '../../name-space';
import {createFetchReducer} from '../../hor';

export const enum RequestType {
  LOAD_PROFILE = `loadProfile`,
  LOAD_USER_POSTS = `loadUserPosts`,
}

const fetchLoadProfile = createFetchReducer(`${[NameSpace.PROFILE]}/${RequestType.LOAD_PROFILE}`);
const fetchLoadProfileActions = fetchLoadProfile.actions;
const fetchLoadProfileSelectors = fetchLoadProfile.selectors;
const fetchLoadProfileReducer = fetchLoadProfile.reducer;

const fetchLoadUserPosts = createFetchReducer(`${[NameSpace.PROFILE]}/${RequestType.LOAD_USER_POSTS}`);
const fetchLoadUserPostsActions = fetchLoadUserPosts.actions;
const fetchLoadUserPostsSelectors = fetchLoadUserPosts.selectors;
const fetchLoadUserPostsReducer = fetchLoadUserPosts.reducer;

const fetchActions = {
  [RequestType.LOAD_PROFILE]: fetchLoadProfileActions,
  [RequestType.LOAD_USER_POSTS]: fetchLoadUserPostsActions,
};

const fetchSelectors = {
  [RequestType.LOAD_PROFILE]: fetchLoadProfileSelectors,
  [RequestType.LOAD_USER_POSTS]: fetchLoadUserPostsSelectors,
};

const fetchReducer = combineReducers({
  [RequestType.LOAD_PROFILE]: fetchLoadProfileReducer,
  [RequestType.LOAD_USER_POSTS]: fetchLoadUserPostsReducer,
});

export {fetchActions, fetchSelectors, fetchReducer};
