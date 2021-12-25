import {shallow} from 'enzyme';
import React from 'react';
import PostCard from '../../../components/post-card/PostCard';
import {postOne} from '../../mocks/post.mock';

jest.mock(`../../../utils/route`, () => ({
  __esModule: true,
  default: {
    ...jest.requireActual(`../../../utils/route`).default,
    createProfilePostRoute: () => `profileRoute`,
    createPostsPost: () => `postRoute`,
  },
}));

describe(`Component RegForm should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<PostCard post={postOne} />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot loading test`, () => {
    const wrapper = shallow(<PostCard post={postOne} isLoading />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot comments render test`, () => {
    const wrapper = shallow(<PostCard post={postOne} modal renderComments={() => <div>Comments</div>} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component RegForm should work correctly`, () => {
  it(`card modes test`, () => {
    const wrapper = shallow(<PostCard post={postOne} />);

    expect(wrapper.find(`article.post-card--top-hide`)).toHaveLength(0);
    expect(wrapper.find(`.post-card__top.post-card__top--hide`)).toHaveLength(0);
    expect(wrapper.find(`article.post-card--modal`)).toHaveLength(0);
    expect(wrapper.find(`.post-card__main`).prop(`to`)).toBe(`postRoute`);

    wrapper.setProps({hideTop: true});
    wrapper.update();

    expect(wrapper.find(`article.post-card--top-hide`)).toHaveLength(1);
    expect(wrapper.find(`.post-card__top.post-card__top--hide`)).toHaveLength(1);
    expect(wrapper.find(`article.post-card--modal`)).toHaveLength(0);
    expect(wrapper.find(`.post-card__main`).prop(`to`)).toBe(`profileRoute`);

    wrapper.setProps({modal: true});
    wrapper.update();

    expect(wrapper.find(`article.post-card--top-hide`)).toHaveLength(1);
    expect(wrapper.find(`.post-card__top.post-card__top--hide`)).toHaveLength(1);
    expect(wrapper.find(`article.post-card--modal`)).toHaveLength(1);
    expect(wrapper.find(`.post-card__main`).prop(`to`)).toBe(`profileRoute`);
  });
});
