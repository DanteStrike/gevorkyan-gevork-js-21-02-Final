import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import ContentLayout, {ContentLayoutType} from '../../components/content-layout/ContentLayout';
import LoginForm from '../../components/login-form/LoginForm';
import useAppDispatch from '../../hooks/use-app-dispatch';
import {authActions, authOperations, authSelectors} from '../../store/auth';
import useAppSelector from '../../hooks/use-app-selector';
import {RouteUtils} from '../../utils';
import useAppTranslation from '../../hooks/use-app-translation';

function Login() {
  const {t} = useAppTranslation(`loginForm`);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isAuth = useAppSelector(authSelectors.getIsAuth);
  const authID = useAppSelector(authSelectors.getID);
  const isLoading = useAppSelector(authSelectors.getIsLoading);
  const isError = useAppSelector(authSelectors.getIsError);
  const errMsg = useAppSelector(authSelectors.getError);

  const handleLogin = (id: string) => {
    dispatch(authOperations.login(id));
  };

  useEffect(() => {
    if (isAuth) {
      history.push(RouteUtils.createProfileRoute(authID));
    }
  }, [isAuth, history, authID]);

  useEffect(
    () => () => {
      dispatch(authActions.requestAbort());
    },
    [dispatch]
  );

  return (
    <ContentLayout type={ContentLayoutType.CONTENT} title={t(`title`)} isError={isError} errMsg={errMsg}>
      <LoginForm onSubmit={handleLogin} loading={isLoading} />
    </ContentLayout>
  );
}

export default Login;
