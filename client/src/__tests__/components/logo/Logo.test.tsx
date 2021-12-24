import {shallow} from 'enzyme';
import React from 'react';
import Logo from '../../../components/logo/Logo';

describe(`Component Logo should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper).toMatchSnapshot();
  });
});
