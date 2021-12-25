import React from 'react';
import {Avatar} from 'antd';
import CustomLink from '../custom-link/CustomLink';
import {IUserPreview} from '../../types';

function LinkedAvatar({user, className, to}: {user: IUserPreview; className: string; to: string}) {
  return (
    <CustomLink to={to} className={className}>
      <Avatar src={user.picture} />
    </CustomLink>
  );
}

export default React.memo(LinkedAvatar);
