import {shallow} from 'enzyme';
import React from 'react';
import ContentLayout, {ContentLayoutType} from '../../../components/content-layout/ContentLayout';

describe(`Component CustomLink should render correctly`, () => {
  it(`snapshot default test`, () => {
    const wrapper = shallow(
      <ContentLayout title="header" type={ContentLayoutType.FULL}>
        <div id="content" />
      </ContentLayout>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot mode test`, () => {
    const wrapper = shallow(
      <ContentLayout title="header" type={ContentLayoutType.CONTENT}>
        <div id="content" />
      </ContentLayout>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it(`snapshot error test`, () => {
    const wrapper = shallow(
      <ContentLayout title="header" type={ContentLayoutType.CONTENT} isError errMsg="error">
        <div id="content" />
      </ContentLayout>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe(`Component CustomLink should work correctly`, () => {
  it(`snapshot error test`, () => {
    const wrapper = shallow(
      <ContentLayout title="header" type={ContentLayoutType.CONTENT}>
        <div id="content" />
      </ContentLayout>
    );
    expect(wrapper.find(`.content-layout__title.content-layout__title--hide`)).toHaveLength(0);
    wrapper.setProps({hideTitle: true});
    expect(wrapper.find(`.content-layout__title.content-layout__title--hide`)).toHaveLength(1);
  });
});
