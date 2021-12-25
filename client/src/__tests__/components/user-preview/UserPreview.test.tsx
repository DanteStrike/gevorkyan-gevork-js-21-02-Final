import React from 'react';
import {shallow} from 'enzyme';
import UserPreview from '../../../components/user-preview/UserPreview';
import {fullUser} from '../../mocks/user.mock';

describe(`Component UserPreview should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<UserPreview isUser={false} user={fullUser} isLoading={false} />);

    expect(wrapper.find(`.user-preview__edit`)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot auth user test`, () => {
    const wrapper = shallow(<UserPreview isUser user={fullUser} isLoading={false} />);

    expect(wrapper.find(`.user-preview__edit`)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component UserPreview should work correctly`, () => {
  it(`loading test`, () => {
    const wrapper = shallow(<UserPreview isUser={false} user={fullUser} isLoading />);

    expect(wrapper.find(`Memo(Loading)`).prop(`isLoading`)).toBe(true);
    wrapper.setProps({isLoading: false});
    expect(wrapper.find(`Memo(Loading)`).prop(`isLoading`)).toBe(false);
  });
});
