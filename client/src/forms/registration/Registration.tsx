import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import RegForm from '../../components/reg-form/RegForm';
import ContentLayout, {ContentLayoutType} from '../../components/content-layout/ContentLayout';
import useAppSelector from '../../hooks/use-app-selector';
import useAppDispatch from '../../hooks/use-app-dispatch';
import {authActions, authOperations, authSelectors} from '../../store/auth';
import {IUserRegistration} from '../../types';
import {RouteUtils} from '../../utils';
import useAppTranslation from '../../hooks/use-app-translation';

function Registration() {
  const {t} = useAppTranslation(`regForm`);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isAuth = useAppSelector(authSelectors.getIsAuth);
  const authID = useAppSelector(authSelectors.getID);
  const isLoading = useAppSelector(authSelectors.getIsLoading);
  const isError = useAppSelector(authSelectors.getIsError);
  const errMsg = useAppSelector(authSelectors.getError);

  useEffect(() => {
    if (isAuth) {
      history.push(RouteUtils.createProfileRoute(authID));
    }
  }, [isAuth, history, authID]);

  const handleRegistration = (data: IUserRegistration) => {
    dispatch(authOperations.registration(data));
  };

  useEffect(
    () => () => {
      dispatch(authActions.requestAbort());
    },
    [dispatch]
  );

  return (
    <ContentLayout type={ContentLayoutType.CONTENT} title={t(`title`)} isError={isError} errMsg={errMsg}>
      <RegForm loading={isLoading} onSubmit={handleRegistration} />
    </ContentLayout>
  );
}

export default Registration;
