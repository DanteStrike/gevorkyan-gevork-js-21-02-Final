import {shallow} from 'enzyme';
import React from 'react';
import AppList from '../../../components/app-list/AppList';
import {posts} from '../../mocks/post.mock';

describe(`Component AppList should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(
      <AppList
        onChange={jest.fn()}
        current={1}
        dataSource={posts.data}
        isLoading={false}
        renderItem={jest.fn()}
        pageSize={posts.limit}
        total={posts.total}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
