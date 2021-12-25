import {shallow} from 'enzyme';
import React from 'react';
import {IThemeContext, Theme, ThemeProvider} from '../../context/ThemeContext';

describe(`Component ThemeProvider should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(
      <ThemeProvider storageKey="key">
        <div id="content" />
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component ThemeProvider should work correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(
      <ThemeProvider storageKey="key">
        <div id="content" />
      </ThemeProvider>
    );
    let value = wrapper.prop(`value`) as IThemeContext;
    expect(value.theme).toBe(Theme.DEFAULT);
    value.setTheme(Theme.DARK);
    wrapper.update();
    value = wrapper.prop(`value`) as IThemeContext;
    expect(value.theme).toBe(Theme.DARK);
    value.setTheme(Theme.LIGHT);
    value = wrapper.prop(`value`) as IThemeContext;
    expect(value.theme).toBe(Theme.LIGHT);
  });
});
