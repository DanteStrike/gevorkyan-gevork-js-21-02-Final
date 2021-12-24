import {createBrowserHistory} from 'history';
import {mount} from 'enzyme';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import mockInitStore from '../../mocks/store.mock';
import {RequestType} from '../../../store/profile/slices/fetch';
import Profile from '../../../forms/profile/Profile';
import {profileActions, profileOperations} from '../../../store/profile';

describe(`Form Profile should work correctly`, () => {
  it(`Load test`, () => {
    profileOperations.loadProfile = jest.fn();
    profileOperations.loadUserPosts = jest.fn();

    const history = createBrowserHistory();
    const wrapper = mount(
      <Router history={history}>
        <Provider store={mockInitStore}>
          <Profile id="userID" />
        </Provider>
      </Router>
    );

    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(2);
    expect(profileOperations.loadProfile).toHaveBeenCalledTimes(1);
    expect(profileOperations.loadUserPosts).toHaveBeenCalledTimes(1);

    jest.resetAllMocks();
    wrapper.unmount();
    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(4);
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(
      profileActions.fetchActions[RequestType.LOAD_PROFILE].requestAbort()
    );
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(
      profileActions.fetchActions[RequestType.LOAD_USER_POSTS].requestAbort()
    );
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(profileActions.reset());
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(profileActions.resetList());
  });

  it(`Change pagination test`, () => {
    const history = createBrowserHistory();
    history.push(`/path/test`);

    const wrapper = mount(
      <Router history={history}>
        <Provider store={mockInitStore}>
          <Profile id="userID" />
        </Provider>
      </Router>
    );

    jest.resetAllMocks();
    (wrapper.find(`AppList`).prop(`onChange`) as Function)(5);
    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(profileActions.changePage(5));
  });
});
