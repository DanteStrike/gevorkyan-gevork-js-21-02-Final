import {createBrowserHistory} from 'history';
import {mount} from 'enzyme';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import mockInitStore from '../../mocks/store.mock';
import Post from '../../../forms/post/Post';
import {postActions, postOperations} from '../../../store/post';
import {RequestType} from '../../../store/post/slices/fetch';

describe(`Form Post should work correctly`, () => {
  it(`Load test`, () => {
    postOperations.loadPost = jest.fn();
    postOperations.loadComments = jest.fn();

    const history = createBrowserHistory();
    const wrapper = mount(
      <Router history={history}>
        <Provider store={mockInitStore}>
          <Post id="userID" />
        </Provider>
      </Router>
    );

    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(2);
    expect(postOperations.loadPost).toHaveBeenCalledTimes(1);
    expect(postOperations.loadComments).toHaveBeenCalledTimes(1);

    jest.resetAllMocks();
    wrapper.unmount();
    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(4);
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(postActions.fetchActions[RequestType.LOAD_POST].requestAbort());
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(
      postActions.fetchActions[RequestType.LOAD_COMMENTS].requestAbort()
    );
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(postActions.reset());
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(postActions.resetList());
  });

  it(`Modal close test`, () => {
    const history = createBrowserHistory();
    history.push(`/path/test`);

    const wrapper = mount(
      <Router history={history}>
        <Provider store={mockInitStore}>
          <Post id="userID" />
        </Provider>
      </Router>
    );

    (wrapper.find(`Modal`).prop(`onClose`) as Function)();
    expect(history.location.pathname).toBe(`/path`);
  });

  it(`Change pagination test`, () => {
    const history = createBrowserHistory();
    history.push(`/path/test`);

    const wrapper = mount(
      <Router history={history}>
        <Provider store={mockInitStore}>
          <Post id="userID" />
        </Provider>
      </Router>
    );

    jest.resetAllMocks();
    (wrapper.find(`AppList`).prop(`onChange`) as Function)(5);
    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(postActions.changePage(5));
  });
});
