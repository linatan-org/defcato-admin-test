import { Redirect, Switch, Route } from 'react-router-dom';
import KeyboardList from '../components/pages/KeyboardList/KeyboardList';
import { SignIn } from '../components/pages/SignIn';
import { routes } from '../constants/routes';
import useAuth from '../contexts/auth/hook';
import { NotFound } from '../components/pages/NotFound';
import Dashboard from '../components/pages/Dashboard';
import SalesReports from '../components/pages/Reports/SalesReports';
import { ToastContainer } from 'react-toastify';
import KeyboardEditor from '../components/pages/KeyboardEditor/KeyboardEditor';

const AppRoutes = () => {
  const authContext = useAuth();
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route
          path="/"
          exact
          render={() =>
            authContext.isAuthenticated() || sessionStorage.token ? (
              <Redirect to={routes.dashboard} />
            ) : (
              <Route
                path="/"
                component={SignIn}
              />
            )
          }
        />
        <Route
          path={routes.dashboard}
          component={Dashboard}
        />
        <Route
          path={routes.salesReports}
          component={SalesReports}
        />
        <Route
          path={routes.keyboardEditor}
          component={KeyboardEditor}
        />
        <Route
          path={routes.keyboardList}
          component={KeyboardList}
        />

        <Route
          path="*"
          component={NotFound}
        />
      </Switch>
    </>
  );
};

export default AppRoutes;
