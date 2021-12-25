import {shallow} from 'enzyme';
import React from 'react';
import Footer from '../../../components/footer/Footer';

describe(`Component Footer should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
