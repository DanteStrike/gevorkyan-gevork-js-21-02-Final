import {mount, shallow} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import ConnectedAuth from '../../../components/connected-auth/ConnectedAuth';
import mockInitStore from '../../mocks/store.mock';
import {authActions} from '../../../store/auth';

describe(`Component ConnectedAuth should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(
      <Provider store={mockInitStore}>
        <ConnectedAuth />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component ConnectedAuth should work correctly`, () => {
  it(`logout test`, () => {
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={mockInitStore}>
          <ConnectedAuth />
        </Provider>
      </MemoryRouter>
    );
    (wrapper.find(`Auth`).prop('onLogout') as Function)();
    expect(mockInitStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockInitStore.dispatch).toHaveBeenLastCalledWith(authActions.logout());
  });
});
