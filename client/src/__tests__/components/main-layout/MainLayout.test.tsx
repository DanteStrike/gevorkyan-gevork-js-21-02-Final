import {shallow} from 'enzyme';
import React from 'react';
import MainLayout from '../../../components/main-layout/MainLayout';

describe(`Component MainLayout should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<MainLayout />);
    expect(wrapper).toMatchSnapshot();
  });
});
