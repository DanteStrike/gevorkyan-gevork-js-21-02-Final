import {shallow} from 'enzyme';
import React from 'react';
import Header from '../../../components/header/Header';

describe(`Component Header should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
