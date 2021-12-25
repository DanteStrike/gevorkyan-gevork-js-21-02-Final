import axios from 'axios';
import request from 'supertest';
import MockAdapter from 'axios-mock-adapter';
import PostRepository from '../../repositories/postRepository';
import {logger} from '../../utils';
import app from '../../app';
import {IPostPreview} from '../../types/post';
import {postOne, posts} from '../__mocks__/post.mock';
import DateUtils from '../../utils/date';
import {IComments, IPosts} from '../../types/lists';
import {IComment} from '../../types/comment';
import {comments} from '../__mocks__/comment.mock';

describe(`class PostService should work correctly`, () => {
  const mockAxiosRes = new MockAdapter(axios);
  DateUtils.normalizeCardDate = jest.fn(() => `normalized`);

  beforeEach(() => {
    logger.info = jest.fn();
    logger.error = jest.fn();
  });

  it(`getPost test`, async () => {
    mockAxiosRes.onGet(`/getPost`).replyOnce(200, postOne);
    PostRepository.getPostFromDummyAPI = jest.fn(() => axios.get<IPostPreview>(`/getPost`));

    const resPostData = {...postOne, publishDate: `normalized`};

    const resSuccess = await request(app).get('/api/post/postID_1');
    expect(PostRepository.getPostFromDummyAPI).toHaveBeenLastCalledWith(`postID_1`);
    expect(resSuccess.body).toStrictEqual(resPostData);

    mockAxiosRes.onGet(`/getPost`).replyOnce(404);

    await request(app).get('/api/post/postID_1');
    expect(logger.error).toHaveBeenCalledTimes(2);
  });

  it(`getPosts test`, async () => {
    mockAxiosRes.onGet(`/getPosts`).replyOnce(200, posts);
    PostRepository.getPostsFromDummyAPI = jest.fn(() => axios.get<IPosts>(`/getPosts`));

    const resPostData = (post: IPostPreview) => ({...post, publishDate: `normalized`});
    const resPostsData = {...posts};
    resPostsData.data = resPostsData.data.map(resPostData);

    const resSuccess = await request(app).get('/api/post?page=0&limit=5');
    expect(PostRepository.getPostsFromDummyAPI).toHaveBeenLastCalledWith(5, 0);
    expect(resSuccess.body).toStrictEqual(resPostsData);

    mockAxiosRes.onGet(`/getPosts`).replyOnce(404);

    await request(app).get('/api/post?page=0&limit=5');
    expect(logger.error).toHaveBeenCalledTimes(2);
  });

  it(`getPostComments test`, async () => {
    mockAxiosRes.onGet(`/getPostComments`).replyOnce(200, comments);
    PostRepository.getPostCommentsFromDummyAPI = jest.fn(() => axios.get<IComments>(`/getPostComments`));

    const resCommentData = (comment: IComment) => ({...comment, publishDate: `normalized`});
    const resCommentsData = {...comments};
    resCommentsData.data = resCommentsData.data.map(resCommentData);

    const resSuccess = await request(app).get('/api/post/postID/comment?page=0&limit=5');
    expect(PostRepository.getPostCommentsFromDummyAPI).toHaveBeenLastCalledWith(`postID`, 5, 0);
    expect(resSuccess.body).toStrictEqual(resCommentsData);

    mockAxiosRes.onGet(`/getPostComments`).replyOnce(404);

    await request(app).get('/api/post/postID/comment?page=0&limit=5');
    expect(logger.error).toHaveBeenCalledTimes(2);
  });
});
