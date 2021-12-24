import React from 'react';
import {Select} from 'antd';
import useAppTranslation from '../../hooks/use-app-translation';

function LangSelector() {
  const {i18n} = useAppTranslation();

  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Select defaultValue={i18n.resolvedLanguage} value={i18n.resolvedLanguage} onChange={handleLangChange}>
      <Select.Option value="ru">ru-RU</Select.Option>
      <Select.Option value="en">en-EN</Select.Option>
    </Select>
  );
}

export default LangSelector;
