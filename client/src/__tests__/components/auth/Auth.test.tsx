import {shallow} from 'enzyme';
import React from 'react';
import Auth from '../../../components/auth/Auth';

describe(`Component Comment should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<Auth isAuth={false} onLogout={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot isAuth test`, () => {
    const wrapper = shallow(
      <Auth
        isAuth
        authUser={{
          id: `id`,
          name: `name`,
          picture: `url`,
        }}
        onLogout={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
