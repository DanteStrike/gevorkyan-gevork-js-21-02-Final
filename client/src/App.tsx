import React, {useEffect, useState} from 'react';
import './App.scss';
import {message} from 'antd';
import useAppSelector from './hooks/use-app-selector';
import {authOperations, authSelectors} from './store/auth';
import Loading from './components/loading/Loading';
import MainLayout from './components/main-layout/MainLayout';
import {authStorageKey} from './store/auth/types';
import useAppDispatch from './hooks/use-app-dispatch';

const enum AppState {
  INIT = `init`,
  WAITING = `waiting`,
  READY = `ready`,
}

function App() {
  const [appSetup, setAppSetup] = useState<AppState>(AppState.INIT);
  const dispatch = useAppDispatch();

  if (appSetup === AppState.INIT) {
    const authStorageID = localStorage.getItem(authStorageKey) || ``;
    if (authStorageID !== ``) {
      dispatch(authOperations.login(authStorageID));
      setAppSetup(AppState.WAITING);
    } else {
      setAppSetup(AppState.READY);
    }
  }

  const isAuthWait = useAppSelector(authSelectors.getIsAuthWait);
  const isAuthError = useAppSelector(authSelectors.getIsError);

  useEffect(() => {
    if (appSetup === AppState.WAITING && isAuthError && isAuthWait) {
      message.error(`Ошибка авто авторизации`);
      setAppSetup(AppState.READY);
    }

    if (appSetup === AppState.WAITING && !isAuthError && !isAuthWait) {
      setAppSetup(AppState.READY);
    }
  }, [appSetup, isAuthError, isAuthWait]);

  if (appSetup !== AppState.READY) {
    return <Loading isLoading />;
  }

  return <MainLayout />;
}

export default App;
