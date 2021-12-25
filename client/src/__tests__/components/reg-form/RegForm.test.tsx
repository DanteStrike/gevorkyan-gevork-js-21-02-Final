import {mount, shallow} from 'enzyme';
import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import moment from 'moment';
import RegForm from '../../../components/reg-form/RegForm';
import sleep from '../../mocks/utils';

describe(`Component RegForm should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<RegForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot loading test`, () => {
    const wrapper = shallow(<RegForm loading />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component RegForm should work correctly`, () => {
  it(`call submit test`, () => {
    const history = createMemoryHistory();
    const submitHandler = jest.fn(() => {});
    const wrapper = mount(
      <Router history={history}>
        <RegForm onSubmit={submitHandler} />
      </Router>
    );

    const mockData = {
      name: `full user name`,
      gender: `female`,
      dateOfBirth: moment().subtract(18, 'years'),
      email: `email@mail.ru`,
      phone: `+79999999999`,
    };

    wrapper.children().children().prop(`form`).setFieldsValue(mockData);
    wrapper.update();
    wrapper.find('form').simulate('submit');

    return sleep().then(() => {
      expect(submitHandler).toHaveBeenCalledTimes(1);
    });
  });
});
