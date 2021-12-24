import {createBrowserHistory} from 'history';
import {mount} from 'enzyme';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import mockInitStore from '../../mocks/store.mock';
import Users from '../../../forms/users/Users';
import {usersActions, usersOperations} from '../../../store/users';

describe(`Form Posts should work correctly`, () => {
  it(`Load test`, () => {
    usersOperations.load = jest.fn();

    const history = createBrowserHistory();
    const wrapper = mount(
      <Router history={history}>
        <Provider store={mockInitStore}>
          <Users />
        </Provider>
      </Router>
    );

    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(1);
    expect(usersOperations.load).toHaveBeenCalledTimes(1);

    jest.resetAllMocks();
    wrapper.unmount();
    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(2);
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(usersActions.requestAbort());
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(usersActions.resetList());
  });

  it(`Change pagination test`, () => {
    const history = createBrowserHistory();
    history.push(`/path/test`);

    const wrapper = mount(
      <Router history={history}>
        <Provider store={mockInitStore}>
          <Users />
        </Provider>
      </Router>
    );

    jest.resetAllMocks();
    (wrapper.find(`AppList`).prop(`onChange`) as Function)(5);
    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockInitStore.dispatch).toHaveBeenCalledWith(usersActions.changePage(5));
  });
});
