import {shallow} from 'enzyme';
import React from 'react';
import CustomLink from '../../../components/custom-link/CustomLink';

describe(`Component CustomLink should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(
      <CustomLink to="/route" className="link">
        <div id="content" />
      </CustomLink>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
