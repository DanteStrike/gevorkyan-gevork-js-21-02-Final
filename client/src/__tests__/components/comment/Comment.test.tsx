import {shallow} from 'enzyme';
import React from 'react';
import {commentOne} from '../../mocks/comment.mock';
import Comment from '../../../components/comment/Comment';

describe(`Component Comment should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<Comment comment={commentOne} />);
    expect(wrapper).toMatchSnapshot();
  });
});
