import React from 'react';
import './ContentLayout.scss';
import {Alert} from 'antd';

export enum ContentLayoutType {
  FULL = `full`,
  CONTENT = `content`,
}

interface ContentLayoutProps {
  type: ContentLayoutType;
  title: string;
  isError?: boolean;
  errMsg?: string | null;
  hideTitle?: boolean;
  children?: React.ReactNode;
}

function ContentLayout({type, hideTitle, title, children, isError, errMsg}: ContentLayoutProps) {
  return (
    <main className={`content-layout content-layout--${type}`}>
      <h1 className={`content-layout__title ${hideTitle ? `content-layout__title--hide` : ``}`.trim()}>{title}</h1>
      {children}
      {isError && <Alert message={errMsg} type="error" className="content-layout__error" closable />}
    </main>
  );
}

ContentLayout.defaultProps = {
  hideTitle: false,
  isError: false,
  errMsg: ``,
  children: ``,
};

export default React.memo(ContentLayout);
