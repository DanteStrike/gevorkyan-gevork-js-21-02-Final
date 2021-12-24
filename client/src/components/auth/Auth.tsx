import React from 'react';
import './Auth.scss';
import {Avatar} from 'antd';
import CustomLink from '../custom-link/CustomLink';
import {RoutePath} from '../../enums';
import {RouteUtils} from '../../utils';
import useAppTranslation from '../../hooks/use-app-translation';

interface IAuthProps {
  isAuth: boolean;
  onLogout: () => void;
  authUser?: {
    id: string;
    name: string;
    picture: string;
  };
}

function Auth({
  isAuth,
  onLogout,
  authUser = {
    id: ``,
    name: ``,
    picture: ``,
  },
}: IAuthProps) {
  const {t} = useAppTranslation(`auth`);
  const {name, picture, id} = authUser;
  const profileRoute = RouteUtils.createProfileRoute(id);

  return (
    <div className="auth">
      {!isAuth ? (
        <>
          <CustomLink className="auth__link auth__link--left" to={RoutePath.LOGIN}>
            {t(`login`)}
          </CustomLink>
          <CustomLink className="auth__link" to={RoutePath.REGISTRATION}>
            {t(`registration`)}
          </CustomLink>
        </>
      ) : (
        <>
          <CustomLink className="auth__link auth__link--left auth__link--profile" to={profileRoute}>
            <Avatar src={picture} />
            <span className="auth__user">{name}</span>
          </CustomLink>
          <button type="button" className="auth__btn" onClick={onLogout}>
            {t(`logout`)}
          </button>
        </>
      )}
    </div>
  );
}

Auth.defaultProps = {
  authUser: {
    id: ``,
    name: ``,
    picture: ``,
  },
};

export default React.memo(Auth);
