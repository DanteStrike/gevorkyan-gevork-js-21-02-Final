import React from 'react';
import {mount, shallow} from 'enzyme';
import {Theme, ThemeContext} from '../../../context/ThemeContext';
import ThemeSwitcher from '../../../components/theme-switcher/ThemeSwitcher';

describe(`Component ThemeSwitcher should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<ThemeSwitcher />);

    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component ThemeSwitcher should work correctly`, () => {
  it(`snapshot default test`, () => {
    const mockContext: any = {
      theme: Theme.LIGHT,
      setTheme: jest.fn((val) => {
        mockContext.theme = val;
      }),
    };

    const wrapper = mount(
      <ThemeContext.Provider value={mockContext}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );
    const component = wrapper.find(`Switch`).at(0);
    expect(component.prop(`checked`)).toBe(false);
    component.simulate(`click`, true);
    expect(mockContext.setTheme).toHaveBeenLastCalledWith(Theme.DARK);

    const wrapperDark = mount(
      <ThemeContext.Provider value={mockContext}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );
    const componentDark = wrapperDark.find(`Switch`).at(0);
    expect(componentDark.prop(`checked`)).toBe(true);
    componentDark.simulate(`click`, false);
    expect(mockContext.setTheme).toHaveBeenLastCalledWith(Theme.LIGHT);

    const wrapperLight = mount(
      <ThemeContext.Provider value={mockContext}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );
    const componentLight = wrapperLight.find(`Switch`).at(0);
    expect(componentLight.prop(`checked`)).toBe(false);
  });
});
