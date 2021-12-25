import {shallow} from 'enzyme';
import React from 'react';
import Modal from '../../../components/modal/Modal';

describe(`Component Modal should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(
      <Modal>
        <div id="content" />
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot error test`, () => {
    const wrapper = shallow(
      <Modal isError errMsg="errMSG">
        <div id="content" />
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component Modal should work correctly`, () => {
  it(`Open/Close test`, () => {
    const closeHandle = jest.fn();

    const wrapper = shallow(
      <Modal onClose={closeHandle}>
        <div id="content" />
      </Modal>
    );
    expect(wrapper.find(`.modal.modal--hide`)).toHaveLength(1);
    wrapper.setProps({isOpen: true});
    expect(wrapper.find(`.modal.modal--hide`)).toHaveLength(0);
    wrapper.find(`button`).simulate(`click`);
    expect(closeHandle).toHaveBeenCalledTimes(1);
  });
});
