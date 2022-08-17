import { Redirect, Switch, Route } from 'react-router-dom';
import { SignIn } from '../components/pages/SignIn/SignIn';
import { routes } from '../constants/routes';
import useAuth from '../contexts/auth/hook';
import { NotFound } from '../components/pages/NotFound';
const AppRoutes = () => {
  const authContext = useAuth();
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() =>
          authContext.isAuthenticated() ? (
            <Redirect to={routes.dashboard} />
          ) : (
            <Route path="/" component={SignIn} />
          )
        }
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default AppRoutes;
