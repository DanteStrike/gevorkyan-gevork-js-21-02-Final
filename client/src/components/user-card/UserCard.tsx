import React from 'react';
import './UserCard.scss';
import {Tooltip} from 'antd';
import {IUserPreview} from '../../types';
import {DataUtils} from '../../utils';

interface IUserCardProps {
  user: IUserPreview;
}

function UserCard({user}: IUserCardProps) {
  const {firstName, lastName, title, picture} = user;
  const name = DataUtils.collectFullName(firstName, lastName, title);

  return (
    <article className="user-card" id={`#user-${user.id}`}>
      {picture ? <img className="user-card__img" alt={name} src={picture} /> : <div className="user-card__img" />}
      <Tooltip
        placement="top"
        title={user.id}
        getPopupContainer={() => document.querySelector(`#user-${user.id}`) || document.body}
      >
        <h2 className="user-card__title">{name}</h2>
      </Tooltip>
    </article>
  );
}

export default React.memo(UserCard);
