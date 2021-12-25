import {shallow} from 'enzyme';
import React from 'react';
import LinkedAvatar from '../../../components/linked-avatar/LinkedAvatar';
import {userTwo} from '../../mocks/user.mock';

describe(`Component LinkedAvatar should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<LinkedAvatar user={userTwo} className="anyClass" to="anyRoute" />);
    expect(wrapper).toMatchSnapshot();
  });
});
