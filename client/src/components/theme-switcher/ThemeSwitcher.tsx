import React, {useContext} from 'react';
import {Switch} from 'antd';
import './ThemeSwithcer.scss';
import {Theme as ContextThemes, ThemeContext} from '../../context/ThemeContext';
import useAppTranslation from '../../hooks/use-app-translation';

function ThemeSwitcher() {
  const themeContext = useContext(ThemeContext);
  const Theme = ContextThemes;
  const {t} = useAppTranslation(`theme`);

  const handleThemeChange = (checked: boolean) => {
    const {setTheme} = themeContext;

    if (checked) {
      setTheme(Theme.DARK);
    } else {
      setTheme(Theme.LIGHT);
    }
  };

  return (
    <Switch
      className="theme-switcher"
      checkedChildren={t(`dark`)}
      unCheckedChildren={t(`light`)}
      onChange={handleThemeChange}
      checked={themeContext.theme === Theme.DARK}
    />
  );
}

export default ThemeSwitcher;
