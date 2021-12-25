import {shallow} from 'enzyme';
import React from 'react';
import * as i18next from '../../../hooks/use-app-translation';
import LangSelector from '../../../components/lang-selector/LangSelector';

describe(`Component LangSelector should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(<LangSelector />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component LangSelector should work correctly`, () => {
  it(`change test`, () => {
    const spy = {
      i18n: {
        changeLanguage: jest.fn(() => Promise.resolve(() => {})),
        resolvedLanguage: `ru`,
      },
    };
    jest.spyOn(i18next, 'default').mockReturnValue(spy as any);

    const wrapper = shallow(<LangSelector />);
    expect(spy.i18n.changeLanguage).toHaveBeenCalledTimes(0);

    wrapper.simulate(`change`, `any`);
    expect(spy.i18n.changeLanguage).toHaveBeenCalledTimes(1);
    expect(spy.i18n.changeLanguage).toHaveBeenLastCalledWith(`any`);
  });
});
