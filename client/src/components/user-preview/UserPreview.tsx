import React from 'react';
import './UserPreview.scss';
import {Link} from 'react-router-dom';
import {EditOutlined} from '@ant-design/icons';
import {IUser} from '../../types';
import Loading from '../loading/Loading';
import {DataUtils, RouteUtils} from '../../utils';
import useAppTranslation from '../../hooks/use-app-translation';

interface IUserPreviewProps {
  isUser: boolean;
  user: IUser;
  isLoading: boolean;
}

function UserPreview({user, isLoading, isUser}: IUserPreviewProps) {
  const {t} = useAppTranslation(`profile`);
  const {id, picture, title, firstName, lastName, gender, email, dateOfBirth, registerDate, phone} = user;
  const name = DataUtils.collectFullName(firstName, lastName, title);
  const profileEditRoute = RouteUtils.createProfileEditRoute(id);

  return (
    <article className="user-preview">
      <Loading isLoading={isLoading} />
      {picture ? <img className="user-preview__img" alt={name} src={picture} /> : <div className="user-preview__img" />}
      <p className="user-preview__info">
        <span className="user-preview__title">{name}</span>
        <span className="user-preview__row">
          <span className="user-preview__prop">{t(`gender`)}</span> {gender}
        </span>
        <span className="user-preview__row">
          <span className="user-preview__prop">{t(`dateOfBirth`)}</span> {dateOfBirth}
        </span>
        <span className="user-preview__row">
          <span className="user-preview__prop">{t(`registerDate`)}</span> {registerDate}
        </span>
        <span className="user-preview__row">
          <span className="user-preview__prop">{t(`email`)}</span> {email}
        </span>
        <span className="user-preview__row">
          <span className="user-preview__prop">{t(`phone`)}</span> {phone}
        </span>
        <span className="user-preview__row user-preview__row--id">
          <span className="user-preview__prop">ID:</span> {id}
        </span>
      </p>
      {isUser && (
        <div className="user-preview__edit">
          <Link className="user-preview__edit-text" to={profileEditRoute}>
            <EditOutlined />
            {t(`edit`)}
          </Link>
        </div>
      )}
    </article>
  );
}

export default React.memo(UserPreview);
