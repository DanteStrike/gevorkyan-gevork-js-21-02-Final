import {shallow} from 'enzyme';
import React from 'react';
import Menu from '../../../components/menu/Menu';

describe(`Component Menu should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<Menu />);
    expect(wrapper).toMatchSnapshot();
  });
});
