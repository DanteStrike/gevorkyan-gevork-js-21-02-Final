import React from 'react';
import {Redirect, Route, RouteComponentProps, Switch} from 'react-router-dom';
import Login from '../../forms/login/Login';
import Registration from '../../forms/registration/Registration';
import Profile from '../../forms/profile/Profile';
import Post from '../../forms/post/Post';
import Users from '../../forms/users/Users';
import Posts from '../../forms/posts/Posts';
import PageError from '../../forms/page-error/PageError';
import useAppSelector from '../../hooks/use-app-selector';
import {authSelectors} from '../../store/auth';
import Edit from '../../forms/edit/Edit';
import RoutePath from '../../enums/routes';
import useAppTranslation from '../../hooks/use-app-translation';

interface IIDMatchParams {
  id: string;
}
interface IWithPostID extends IIDMatchParams {
  postID: string;
}

function Routes() {
  const {t} = useAppTranslation(`error.page`);
  const authID = useAppSelector(authSelectors.getID);

  return (
    <Switch>
      <Route exact path={RoutePath.BASE}>
        <Redirect to={RoutePath.LOGIN} />
      </Route>
      <Route exact path={RoutePath.LOGIN} component={() => <Login />} />
      <Route exact path={RoutePath.REGISTRATION} component={() => <Registration />} />
      <Route
        exact
        path={`${RoutePath.PROFILE}/:id`}
        render={({
          match: {
            params: {id},
          },
        }: RouteComponentProps<IIDMatchParams>) => <Profile id={id} />}
      />
      <Route
        exact
        path={`${RoutePath.PROFILE}/:id/edit`}
        render={({
          match: {
            params: {id},
          },
        }: RouteComponentProps<IIDMatchParams>) =>
          authID === id ? (
            <>
              <Profile id={id} />
              <Edit />
            </>
          ) : (
            <Redirect to={RoutePath.DENIED} />
          )
        }
      />
      <Route
        exact
        path={`${RoutePath.PROFILE}/:id/:postID`}
        render={({
          match: {
            params: {id, postID},
          },
        }: RouteComponentProps<IWithPostID>) => (
          <>
            <Profile id={id} />
            <Post id={postID} />
          </>
        )}
      />
      <Route exact path={RoutePath.USERS} component={() => <Users />} />
      <Route exact path={RoutePath.POSTS} render={() => <Posts />} />
      <Route
        path={`${RoutePath.POSTS}/:id`}
        exact
        render={({
          match: {
            params: {id},
          },
        }: RouteComponentProps<IIDMatchParams>) => (
          <>
            <Posts />
            <Post id={id} />
          </>
        )}
      />
      <Route exact path={RoutePath.DENIED} render={() => <PageError title="Error: 403" text={t(`permission`)} />} />
      <Route render={() => <PageError title="Error: 404" text={t(`notFound`)} />} />
    </Switch>
  );
}

export default React.memo(Routes);
