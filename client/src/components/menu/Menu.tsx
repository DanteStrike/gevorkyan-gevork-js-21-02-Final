import React from 'react';
import {Menu as MenuANTD} from 'antd';
import {UserOutlined, PictureOutlined} from '@ant-design/icons';
import CustomLink from '../custom-link/CustomLink';
import './Menu.scss';
import {RoutePath} from '../../enums';
import useAppTranslation from '../../hooks/use-app-translation';

const iconStyle = {
  fontSize: `20px`,
};

function Menu() {
  const {t} = useAppTranslation(`menu`);

  return (
    <MenuANTD className="menu" mode="horizontal" selectedKeys={[]}>
      <MenuANTD.Item className="menu__item" key="users" icon={<UserOutlined style={iconStyle} />}>
        <CustomLink className="menu__link" to={RoutePath.USERS}>
          <span className="menu__text">{t(`users`)}</span>
        </CustomLink>
      </MenuANTD.Item>
      <MenuANTD.Item className="menu__item" key="posts" icon={<PictureOutlined style={iconStyle} />}>
        <CustomLink className="menu__link" to={RoutePath.POSTS}>
          <span className="menu__text">{t(`posts`)}</span>
        </CustomLink>
      </MenuANTD.Item>
    </MenuANTD>
  );
}

export default React.memo(Menu);
