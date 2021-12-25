import {mount, shallow} from 'enzyme';
import React from 'react';
import App from '../../App';
import * as useAppSelector from '../../hooks/use-app-selector';
import * as useAppDispatch from '../../hooks/use-app-dispatch';
import MainLayout from '../../components/main-layout/MainLayout';

describe(`App should render correctly`, () => {
  it(`mode ready snapshot`, () => {
    jest.spyOn(useAppSelector, `default`).mockReturnValue(false);
    jest.spyOn(useAppDispatch, `default`).mockReturnValue(jest.fn());

    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`mode waiting snapshot`, () => {
    jest
      .spyOn(useAppSelector, `default`)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    jest.spyOn(useAppDispatch, `default`).mockReturnValue(jest.fn());
    localStorage.setItem(`app-auth-id`, `anyID`);

    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`App should work correctly`, () => {
  it(`success loading snapshot`, () => {
    jest.spyOn(MainLayout, `type`).mockImplementation(() => <div id="main-content" />);
    jest.spyOn(useAppSelector, `default`).mockReturnValue(false);
    jest.spyOn(useAppDispatch, `default`).mockReturnValue(jest.fn());
    localStorage.setItem(`app-auth-id`, `anyID`);

    const wrapper = mount(<App />);
    expect(wrapper.find(`#main-content`)).toHaveLength(1);
  });

  it(`error loading snapshot`, () => {
    jest.spyOn(MainLayout, `type`).mockImplementation(() => <div id="main-content" />);
    jest.spyOn(useAppSelector, `default`).mockReturnValue(true);
    jest.spyOn(useAppDispatch, `default`).mockReturnValue(jest.fn());
    localStorage.setItem(`app-auth-id`, `anyID`);

    const wrapper = mount(<App />);
    expect(wrapper.find(`#main-content`)).toHaveLength(1);
  });
});
