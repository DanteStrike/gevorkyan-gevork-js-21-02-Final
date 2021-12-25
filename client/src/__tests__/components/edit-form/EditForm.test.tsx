import {mount, shallow} from 'enzyme';
import React from 'react';
import moment from 'moment';
import EditForm from '../../../components/edit-form/EditForm';
import {fullUser} from '../../mocks/user.mock';
import sleep from '../../mocks/utils';

describe(`Component Footer should render correctly`, () => {
  const user = {...fullUser, dateOfBirth: `1996-04-30T19:26:49.610Z`};

  it(`snapshot default test`, () => {
    const wrapper = shallow(<EditForm user={user} />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot loading test`, () => {
    const wrapper = shallow(<EditForm user={user} loading />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component Footer should work correctly`, () => {
  const user = {...fullUser, phone: `+79999999999`, dateOfBirth: `1996-04-30T19:26:49.610Z`};

  it(`call submit test test`, () => {
    const submitHandle = jest.fn();
    const wrapper = mount(<EditForm user={user} onSubmit={submitHandle} />);

    wrapper
      .children()
      .prop(`form`)
      .setFieldsValue({...user, dateOfBirth: moment(`1996-04-30T19:26:49.610Z`)});
    wrapper.update();
    wrapper.find('form').simulate('submit');

    return sleep().then(() => {
      expect(submitHandle).toHaveBeenCalledTimes(1);
    });
  });
});
