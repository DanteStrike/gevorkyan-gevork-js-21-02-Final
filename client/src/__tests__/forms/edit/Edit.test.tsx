import {mount} from 'enzyme';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import {createBrowserHistory} from 'history';
import mockInitStore from '../../mocks/store.mock';
import Edit from '../../../forms/edit/Edit';
import {authOperations} from '../../../store/auth';

describe(`Form Edit should work correctly`, () => {
  it(`Modal close test`, () => {
    const history = createBrowserHistory();
    history.push(`/path/test`);

    const wrapper = mount(
      <Router history={history}>
        <Provider store={mockInitStore}>
          <Edit />
        </Provider>
      </Router>
    );

    (wrapper.find(`Modal`).prop(`onClose`) as Function)();
    expect(history.location.pathname).toBe(`/path`);
  });

  it(`EditForm submit test`, () => {
    const history = createBrowserHistory();
    authOperations.update = jest.fn();
    history.push(`/path/test`);

    const wrapper = mount(
      <Router history={history}>
        <Provider store={mockInitStore}>
          <Edit />
        </Provider>
      </Router>
    );

    (wrapper.find(`EditForm`).prop(`onSubmit`) as Function)();
    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(1);
    expect(authOperations.update).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toBe(`/path`);
  });
});
