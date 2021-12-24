import {RouteUtils} from '../../utils';

describe(`RequestUtils should work correctly`, () => {
  it(`createProfileRoute test`, () => {
    expect(RouteUtils.createProfileRoute(`test`)).toBe(`/profile/test`);
  });

  it(`createProfileEditRoute test`, () => {
    expect(RouteUtils.createProfileEditRoute(`test`)).toBe(`/profile/test/edit`);
  });

  it(`createProfilePostRoute test`, () => {
    expect(RouteUtils.createProfilePostRoute(`user`, `post`)).toBe(`/profile/user/post`);
  });

  it(`createPostsPost test`, () => {
    expect(RouteUtils.createPostsPost(`test`)).toBe(`/posts/test`);
  });
});
