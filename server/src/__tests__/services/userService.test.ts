import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import request from 'supertest';
import DateUtils from '../../utils/date';
import {logger} from '../../utils';
import UserRepository from '../../repositories/userRepository';
import {IUser} from '../../types/user';
import {fullUser, regUserData, updUserData, userOne, usersList, userTwo} from '../__mocks__/user.mock';
import app from '../../app';
import {IPosts, IUsers} from '../../types/lists';
import UserActions from '../../actions/userActions';
import {posts} from '../__mocks__/post.mock';

describe(`class UserService should work correctly`, () => {
  const mockAxiosRes = new MockAdapter(axios);
  DateUtils.normalizeUserDate = jest.fn(() => `normalized`);

  beforeEach(() => {
    logger.info = jest.fn();
    logger.error = jest.fn();
  });

  it(`getUser test`, async () => {
    mockAxiosRes.onGet(`/getUser`).replyOnce(200, fullUser);
    UserRepository.getUserByIDFromDummyAPI = jest.fn(() => axios.get<IUser>(`/getUser`));

    const resUserData = {...fullUser, dateOfBirth: `normalized`, registerDate: `normalized`};

    const resSuccess = await request(app).get('/api/user/userID');
    expect(UserRepository.getUserByIDFromDummyAPI).toHaveBeenLastCalledWith(`userID`);
    expect(resSuccess.body).toStrictEqual(resUserData);

    mockAxiosRes.onGet(`/getUser`).replyOnce(404);
    await request(app).get('/api/user/userID');
    expect(logger.error).toHaveBeenCalledTimes(2);
  });

  it(`getUsersList test`, async () => {
    mockAxiosRes.onGet(`/getUsersList`).replyOnce(200, usersList);
    UserRepository.getUsersListFromDummyAPI = jest.fn(() => axios.get<IUsers>(`/getUsersList`));

    const resSuccess = await request(app).get('/api/user');
    expect(resSuccess.body).toStrictEqual(usersList);

    mockAxiosRes.onGet(`/getUsersList`).replyOnce(404);
    await request(app).get('/api/user');
    expect(logger.error).toHaveBeenCalledTimes(2);
  });

  it(`createUser test`, async () => {
    mockAxiosRes.onPost(`/createUser`, regUserData).replyOnce(200, userTwo);
    UserActions.createUserOnDummyAPI = jest.fn(() => axios.post<IUser>(`/createUser`, regUserData));

    const resSuccess = await request(app).post('/api/user/create').send(regUserData);
    expect(UserActions.createUserOnDummyAPI).toHaveBeenLastCalledWith(regUserData);
    expect(resSuccess.body).toStrictEqual(userTwo);

    mockAxiosRes.onPost(`/createUser`, regUserData).replyOnce(404);
    await request(app).post('/api/user/create');
    expect(logger.error).toHaveBeenCalledTimes(2);
  });

  it(`updateUser test`, async () => {
    mockAxiosRes.onPut(`/updateUser`, updUserData).replyOnce(200, userOne);
    UserActions.updateUserOnDummyAPI = jest.fn(() => axios.put<IUser>(`/updateUser`, updUserData));

    const resSuccess = await request(app).put('/api/user/userID').send(updUserData);
    expect(UserActions.updateUserOnDummyAPI).toHaveBeenLastCalledWith(`userID`, updUserData);
    expect(resSuccess.body).toStrictEqual(userOne);

    mockAxiosRes.onPut(`/updateUser`, updUserData).replyOnce(404);
    await request(app).put('/api/user/userID');
    expect(logger.error).toHaveBeenCalledTimes(2);
  });

  it(`getUserPosts test`, async () => {
    mockAxiosRes.onGet(`/getUserPosts`).replyOnce(200, posts);
    UserRepository.getUserPostsFromDummyAPI = jest.fn(() => axios.get<IPosts>(`/getUserPosts`));

    const resSuccess = await request(app).get('/api/user/userID/post?page=0&limit=5');
    expect(UserRepository.getUserPostsFromDummyAPI).toHaveBeenLastCalledWith(`userID`, 5, 0);
    expect(resSuccess.body).toStrictEqual(posts);

    mockAxiosRes.onGet(`/getUserPosts`).replyOnce(404);
    await request(app).get('/api/user/userID/post?page=0&limit=5');
    expect(logger.error).toHaveBeenCalledTimes(2);
  });
});
