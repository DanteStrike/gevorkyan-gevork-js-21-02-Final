import {createBrowserHistory} from 'history';
import {mount} from 'enzyme';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import mockInitStore, {mockStore} from '../../mocks/store.mock';
import Login from '../../../forms/login/Login';
import {authActions, authOperations} from '../../../store/auth';

describe(`Form Login should work correctly`, () => {
  it(`Submit test`, () => {
    const history = createBrowserHistory();
    authOperations.login = jest.fn();
    history.push(`/path/test`);

    const wrapper = mount(
      <Router history={history}>
        <Provider store={mockInitStore}>
          <Login />
        </Provider>
      </Router>
    );

    (wrapper.find(`LoginForm`).prop(`onSubmit`) as Function)();
    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(1);
    expect(authOperations.login).toHaveBeenCalledTimes(1);

    wrapper.unmount();
    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(2);
    expect(mockInitStore.dispatch).toHaveBeenLastCalledWith(authActions.requestAbort());
  });

  it(`Auth test`, () => {
    const history = createBrowserHistory();
    history.push(`/path/test`);

    mount(
      <Router history={history}>
        <Provider store={mockStore}>
          <Login />
        </Provider>
      </Router>
    );

    expect(history.location.pathname).toBe(`/profile/userID`);
  });
});
