import {shallow} from 'enzyme';
import React from 'react';
import Loading from '../../../components/loading/Loading';

describe(`Component Loading should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<Loading isLoading={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot loading test`, () => {
    const wrapper = shallow(<Loading isLoading />);
    expect(wrapper).toMatchSnapshot();
  });
});
