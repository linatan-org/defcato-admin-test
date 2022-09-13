import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Switch, Route, useLocation } from 'react-router-dom';
import Editor from '../components/pages/Editor';
import KeyboardList from '../components/pages/KeyboardList/KeyboardList';
import PaymentKeyboardEditor from '../components/pages/PaymentKeyboardEditor/PaymentKeyboardEditor';
import { SignIn } from '../components/pages/SignIn';
import { routes } from '../constants/routes';
import useAuth from '../contexts/auth/hook';
import { NotFound } from '../components/pages/NotFound';
import Dashboard from '../components/pages/Dashboard';
import SalesReports from '../components/pages/Reports/SalesReports';
import { ToastContainer } from 'react-toastify';
import KeyboardEditor from '../components/pages/KeyboardEditor/KeyboardEditor';
import { injectDispatch } from '../server';
import { setDashboardAccessOnly } from '../reudux/settings/action';

const AppRoutes = () => {
  const authContext = useAuth();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { isDashboardAccessOnly } = useSelector((state: any) => state.settings);

  useEffect(() => {
    if (search) {
      const SessionKey = new URLSearchParams(search).get('SessionKey');
      if (SessionKey) {
        dispatch(setDashboardAccessOnly(true));
        sessionStorage.setItem('token', SessionKey);
        authContext.setIsSignedIn(true);
      }
    }
  }, [search]);

  useEffect(() => {
    injectDispatch(dispatch);
  }, []);
  return (
    <>
      <ToastContainer />
      <Switch>
        {isDashboardAccessOnly ? (
          <>
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
          </>
        ) : (
          <>
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
              path={routes.keyboardEditorDuplicate}
              component={KeyboardEditor}
            />
            <Route
              path={routes.keyboardEditorNew}
              component={KeyboardEditor}
            />
            <Route
              path={routes.keyboardList}
              component={KeyboardList}
            />
            <Route
              path={routes.dailyInstructionEditor}
              component={Editor}
            />
            <Route
              path={routes.paymentsEditor}
              component={PaymentKeyboardEditor}
            />
            {/*<Route*/}
            {/*path="*"*/}
            {/*exact={true}*/}
            {/*component={NotFound}*/}
            {/*/>*/}
          </>
        )}
      </Switch>
    </>
  );
};

export default AppRoutes;
