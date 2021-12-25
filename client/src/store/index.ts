import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import configureAPI from '../server/cofigure-api';
import {usersReducer} from './users';
import NameSpace from './name-space';
import {profileReducer} from './profile';
import {postsReducer} from './posts';
import {authReducer} from './auth';
import {postReducer} from './post';

const api = configureAPI();
const rootReducer = combineReducers({
  [NameSpace.USERS]: usersReducer,
  [NameSpace.PROFILE]: profileReducer,
  [NameSpace.POSTS]: postsReducer,
  [NameSpace.AUTH]: authReducer,
  [NameSpace.POST]: postReducer,
});

const configuredStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));
export type RootState = ReturnType<typeof configuredStore.getState>;
export type AppDispatch = typeof configuredStore.dispatch;
export default configuredStore;
