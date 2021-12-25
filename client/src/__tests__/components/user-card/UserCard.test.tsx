import {shallow} from 'enzyme';
import React from 'react';
import UserCard from '../../../components/user-card/UserCard';
import {userOne} from '../../mocks/user.mock';

describe(`Component UserPreview should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<UserCard user={userOne} />);

    expect(wrapper.find(`div.user-card__img`)).toHaveLength(0);
    expect(wrapper.find(`img.user-card__img`)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot undefined picture test`, () => {
    const wrapper = shallow(<UserCard user={{...userOne, picture: undefined}} />);

    expect(wrapper.find(`div.user-card__img`)).toHaveLength(1);
    expect(wrapper.find(`img.user-card__img`)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });
});
