import React from 'react';
import Auth from '../auth/Auth';
import useAppSelector from '../../hooks/use-app-selector';
import {authActions, authSelectors} from '../../store/auth';
import useAppDispatch from '../../hooks/use-app-dispatch';

function ConnectedAuth() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(authSelectors.getIsAuth);
  const authUser = useAppSelector(authSelectors.getAuthUser);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <>
      <Auth isAuth={isAuth} authUser={authUser} onLogout={handleLogout} />
    </>
  );
}

export default React.memo(ConnectedAuth);
