import {shallow} from 'enzyme';
import React from 'react';
import PageError from '../../../forms/page-error/PageError';

describe(`Form PageError should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<PageError title="title" text="text" />);
    expect(wrapper).toMatchSnapshot();
  });
});
