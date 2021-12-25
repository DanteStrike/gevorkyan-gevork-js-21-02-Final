import {shallow} from 'enzyme';
import React from 'react';
import SubmitButton from '../../../components/submit-button/SubmitButton';

describe(`Component SubmitButton should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<SubmitButton />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot loading test`, () => {
    const wrapper = shallow(<SubmitButton loading />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot children test`, () => {
    const wrapper = shallow(
      <SubmitButton>
        <div>text</div>
      </SubmitButton>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
