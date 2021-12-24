import React from 'react';
import ContentLayout, {ContentLayoutType} from '../../components/content-layout/ContentLayout';

interface IPageErrorProps {
  title: string;
  text: string;
}

function PageError({title, text}: IPageErrorProps) {
  return (
    <ContentLayout type={ContentLayoutType.CONTENT} title={title}>
      <p>{text}</p>
    </ContentLayout>
  );
}

export default PageError;
