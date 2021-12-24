import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const initStoreData = {
  USERS: {
    fetch: {
      status: 'idle',
      error: null,
      controller: null,
    },
    list: {
      current: 1,
      total: 0,
      data: [
        {
          id: '',
          title: '',
          firstName: '',
          lastName: '',
          picture: '',
        },
        {
          id: '',
          title: '',
          firstName: '',
          lastName: '',
          picture: '',
        },
        {
          id: '',
          title: '',
          firstName: '',
          lastName: '',
          picture: '',
        },
        {
          id: '',
          title: '',
          firstName: '',
          lastName: '',
          picture: '',
        },
        {
          id: '',
          title: '',
          firstName: '',
          lastName: '',
          picture: '',
        },
        {
          id: '',
          title: '',
          firstName: '',
          lastName: '',
          picture: '',
        },
      ],
    },
  },
  PROFILE: {
    fetch: {
      loadProfile: {
        status: 'idle',
        error: null,
        controller: null,
      },
      loadUserPosts: {
        status: 'idle',
        error: null,
        controller: null,
      },
    },
    user: {
      id: '',
      title: '',
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      dateOfBirth: '',
      registerDate: '',
      phone: '',
      picture: '',
      location: {
        street: '',
        city: '',
        state: '',
        country: '',
        timezone: '',
      },
    },
    posts: {
      current: 1,
      total: 0,
      data: [
        {
          id: '',
          text: '',
          image: '',
          publishDate: '',
          owner: {
            id: '',
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
          },
        },
        {
          id: '',
          text: '',
          image: '',
          publishDate: '',
          owner: {
            id: '',
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
          },
        },
        {
          id: '',
          text: '',
          image: '',
          publishDate: '',
          owner: {
            id: '',
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
          },
        },
      ],
    },
  },
  POSTS: {
    fetch: {
      status: 'idle',
      error: null,
      controller: null,
    },
    list: {
      current: 1,
      total: 0,
      data: [
        {
          id: '',
          text: '',
          image: '',
          publishDate: '',
          owner: {
            id: '',
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
          },
        },
        {
          id: '',
          text: '',
          image: '',
          publishDate: '',
          owner: {
            id: '',
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
          },
        },
        {
          id: '',
          text: '',
          image: '',
          publishDate: '',
          owner: {
            id: '',
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
          },
        },
        {
          id: '',
          text: '',
          image: '',
          publishDate: '',
          owner: {
            id: '',
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
          },
        },
        {
          id: '',
          text: '',
          image: '',
          publishDate: '',
          owner: {
            id: '',
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
          },
        },
        {
          id: '',
          text: '',
          image: '',
          publishDate: '',
          owner: {
            id: '',
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
          },
        },
      ],
    },
  },
  AUTH: {
    fetch: {
      status: 'idle',
      error: null,
      controller: null,
    },
    status: 'idle',
    user: {
      id: '',
      name: '',
      picture: '',
    },
  },
  POST: {
    fetch: {
      loadPost: {
        status: 'idle',
        error: null,
        controller: null,
      },
      loadComments: {
        status: 'idle',
        error: null,
        controller: null,
      },
    },
    post: {
      id: '',
      text: '',
      image: '',
      publishDate: '',
      owner: {
        id: '',
        title: '',
        firstName: '',
        lastName: '',
        picture: '',
      },
    },
    comments: {
      current: 1,
      total: 0,
      data: [
        {
          id: '',
          message: '',
          owner: {
            id: '',
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
          },
          post: '',
          publishDate: '',
        },
        {
          id: '',
          message: '',
          owner: {
            id: '',
            title: '',
            firstName: '',
            lastName: '',
            picture: '',
          },
          post: '',
          publishDate: '',
        },
      ],
    },
  },
};

export const storeData = {
  AUTH: {
    fetch: {
      status: 'aborted',
      error: null,
      controller: null,
    },
    status: 'authorized',
    user: {
      id: 'userID',
      name: 'Ro',
      picture: 'url',
    },
  },
};

const middlewares = [thunk];
const configuredStore = configureStore(middlewares);
const mockInitStore = configuredStore(initStoreData);
mockInitStore.dispatch = jest.fn();

export const mockStore = configuredStore(storeData);
mockStore.dispatch = jest.fn();

export default mockInitStore;
