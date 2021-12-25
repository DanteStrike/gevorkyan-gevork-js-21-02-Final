import {createMemoryHistory} from 'history';
import {shallow, render, mount} from 'enzyme';
import {Router} from 'react-router-dom';
import React from 'react';
import {Provider} from 'react-redux';
import Routes from '../../../components/routes/Routes';
import mockInitStore from '../../mocks/store.mock';
import * as useAppSelectorModule from '../../../hooks/use-app-selector';

describe(`Component Routes should render correctly`, () => {
  it(`snapshot test`, () => {
    jest.spyOn(useAppSelectorModule, 'default').mockReturnValue(null);

    const wrapper = shallow(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component Routes should work correctly`, () => {
  it(`/profile/userID/edit path test`, () => {
    jest.spyOn(useAppSelectorModule, 'default').mockReturnValueOnce(`userID`);
    const history = createMemoryHistory();
    history.push(`/profile/userID/edit`);
    const wrapper = render(
      <Provider store={mockInitStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(wrapper.find(`h1`).text()).toBe(`User Profile`);
    expect(wrapper.find(`#edit`)).toHaveLength(1);
  });

  it(`error path test`, () => {
    jest.spyOn(useAppSelectorModule, 'default').mockReturnValue(null);

    const history = createMemoryHistory();
    history.push(`/errorPath`);
    const wrapper = render(
      <Router history={history}>
        <Routes />
      </Router>
    );
    expect(wrapper.find(`h1`).text()).toBe(`Error: 404`);
  });

  it(`denied path test`, () => {
    jest.spyOn(useAppSelectorModule, 'default').mockReturnValueOnce(null);

    const history = createMemoryHistory();
    history.push(`/denied`);
    const wrapper = render(
      <Router history={history}>
        <Routes />
      </Router>
    );
    expect(wrapper.find(`h1`).text()).toBe(`Error: 403`);
  });

  it(`/login path test`, () => {
    const history = createMemoryHistory();
    history.push(`/login`);

    const wrapper = render(
      <Provider store={mockInitStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(wrapper.find(`#login`)).toHaveLength(1);
  });

  it(`/registration path test`, () => {
    const history = createMemoryHistory();
    history.push(`/registration`);

    const wrapper = render(
      <Provider store={mockInitStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(wrapper.find(`#registration`)).toHaveLength(1);
  });

  it(`/profile/id path test`, () => {
    const history = createMemoryHistory();
    history.push(`/profile/id`);

    const wrapper = render(
      <Provider store={mockInitStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(wrapper.find(`h1`).text()).toBe(`User Profile`);
  });

  it(`/users path test`, () => {
    const history = createMemoryHistory();
    history.push(`/users`);
    const wrapper = render(
      <Provider store={mockInitStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(wrapper.find(`h1`).text()).toBe(`Users`);
  });

  it(`/posts path test`, () => {
    const history = createMemoryHistory();
    history.push(`/posts`);
    const wrapper = render(
      <Provider store={mockInitStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(wrapper.find(`h1`).text()).toBe(`Posts`);
  });

  it(`/posts/id path test`, () => {
    const history = createMemoryHistory();
    history.push(`/posts/id`);
    const wrapper = render(
      <Provider store={mockInitStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(wrapper.find(`h1`).text()).toBe(`Posts`);
    expect(wrapper.find(`.post-card--modal`)).toHaveLength(1);
  });

  it(`/profile/userID/postID path test`, () => {
    const history = createMemoryHistory();
    history.push(`/profile/userID/postID`);
    const wrapper = render(
      <Provider store={mockInitStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(wrapper.find(`h1`).text()).toBe(`User Profile`);
    expect(wrapper.find(`.post-card--modal`)).toHaveLength(1);
  });

  it(`/profile/userID/edit path denied test`, () => {
    const history = createMemoryHistory();
    history.push(`/profile/userID/edit`);
    const wrapper = mount(
      <Provider store={mockInitStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(wrapper.find(`h1`).text()).toBe(`Error: 403`);
  });

  it(`/ path test`, () => {
    const history = createMemoryHistory();
    history.push(`/`);
    const wrapper = mount(
      <Provider store={mockInitStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(wrapper.find(`h1`).text()).toBe(`Login`);
  });
});
