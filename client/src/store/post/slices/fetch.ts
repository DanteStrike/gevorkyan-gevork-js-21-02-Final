import {combineReducers} from 'redux';
import NameSpace from '../../name-space';
import {createFetchReducer} from '../../hor';

export const enum RequestType {
  LOAD_POST = `loadPost`,
  LOAD_COMMENTS = `loadComments`,
}

const fetchLoadPost = createFetchReducer(`${[NameSpace.POST]}/${RequestType.LOAD_POST}`);
const fetchLoadPostActions = fetchLoadPost.actions;
const fetchLoadPostSelectors = fetchLoadPost.selectors;
const fetchLoadPostReducer = fetchLoadPost.reducer;

const fetchLoadComments = createFetchReducer(`${[NameSpace.POST]}/${RequestType.LOAD_COMMENTS}`);
const fetchLoadCommentsActions = fetchLoadComments.actions;
const fetchLoadCommentsSelectors = fetchLoadComments.selectors;
const fetchLoadCommentsReducer = fetchLoadComments.reducer;

const fetchActions = {
  [RequestType.LOAD_POST]: fetchLoadPostActions,
  [RequestType.LOAD_COMMENTS]: fetchLoadCommentsActions,
};

const fetchSelectors = {
  [RequestType.LOAD_POST]: fetchLoadPostSelectors,
  [RequestType.LOAD_COMMENTS]: fetchLoadCommentsSelectors,
};

const fetchReducer = combineReducers({
  [RequestType.LOAD_POST]: fetchLoadPostReducer,
  [RequestType.LOAD_COMMENTS]: fetchLoadCommentsReducer,
});

export {fetchActions, fetchSelectors, fetchReducer};
