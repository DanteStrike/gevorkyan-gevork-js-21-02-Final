import {mount, shallow} from 'enzyme';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import React from 'react';
import sleep from '../../mocks/utils';
import LoginForm from '../../../components/login-form/LoginForm';

describe(`Component LoginForm should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot loading test`, () => {
    const wrapper = shallow(<LoginForm loading />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component LoginForm should work correctly`, () => {
  it(`call submit test`, () => {
    const history = createMemoryHistory();
    const submitHandler = jest.fn(() => {});
    const wrapper = mount(
      <Router history={history}>
        <LoginForm onSubmit={submitHandler} />
      </Router>
    );

    const mockData = {
      id: `anyID`,
    };

    wrapper.children().children().prop(`form`).setFieldsValue(mockData);
    wrapper.update();
    wrapper.find('form').simulate('submit');

    return sleep().then(() => {
      expect(submitHandler).toHaveBeenCalledTimes(1);
      expect(submitHandler).toHaveBeenLastCalledWith(`anyID`);
    });
  });
});
