import React from 'react';
import {shallow} from 'enzyme';
import UploadButton from '../../../components/upload-button/UploadButton';

describe(`Component UploadButton should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<UploadButton loading={false} />);

    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot loading test`, () => {
    const wrapper = shallow(<UploadButton loading={false} />);

    expect(wrapper).toMatchSnapshot();
  });
});
