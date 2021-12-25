import React from 'react';
import './Logo.scss';
import {TwitterCircleFilled} from '@ant-design/icons';
import CustomLink from '../custom-link/CustomLink';
import {RoutePath} from '../../enums';

function Logo() {
  return (
    <CustomLink to={RoutePath.BASE}>
      <div className="logo">
        <TwitterCircleFilled className="logo__icon" />
        <p className="logo__title">Delta World</p>
      </div>
    </CustomLink>
  );
}

export default React.memo(Logo);
