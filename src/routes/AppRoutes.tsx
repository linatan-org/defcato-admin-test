import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Editor from '../components/pages/Editor';
import KeyboardList from '../components/pages/KeyboardList/KeyboardList';
import PaymentKeyboardEditor from '../components/pages/PaymentKeyboardEditor/PaymentKeyboardEditor';
import Catalog from '../components/pages/Reports/Catalog';
import OrdersReports from '../components/pages/Reports/OrdersReports';
import TargetReport from '../components/pages/Reports/TargetReport';
import TicketReports from '../components/pages/Reports/TicketReports';
import Sellers from '../components/pages/Sellers';
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
import ZReports from '../components/pages/Reports/ZReports';

const AppRoutes = () => {
  const authContext = useAuth();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigation = useHistory();
  const { isDashboardAccessOnly } = useSelector((state: any) => state.settings);

  useEffect(() => {
    if (search) {
      const SessionKey = new URLSearchParams(search).get('SessionKey');
      const url = new URLSearchParams(search).get('url');
      if (SessionKey) {
        dispatch(setDashboardAccessOnly(true));
        sessionStorage.setItem('token', SessionKey);
        authContext.setIsSignedIn(true);
        if (url) {
          navigation.replace(url);
        }
      }
    }
  }, [search]);

  useEffect(() => {
    injectDispatch(dispatch);
  }, []);

  useEffect(() => {
    if (!sessionStorage.token) {
      // dispatch(setDashboardAccessOnly(false));
      authContext.setIsSignedIn(false);
      navigation.replace('/');
    }
  }, [authContext.isAuthenticated(), sessionStorage.token]);

  return (
    <>
      <ToastContainer />
      <Switch>
        {isDashboardAccessOnly ? (
          <>
            <Route
              path={routes.dashboard}
              component={Dashboard}
            />
            <Route
              path={routes.salesReports}
              component={SalesReports}
            />
            <Route
              path={routes.ordersReports}
              component={OrdersReports}
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
              path={routes.targetReports}
              component={TargetReport}
            />
            <Route
              path={routes.ordersReports}
              component={OrdersReports}
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
            <Route
              path={routes.zReports}
              component={ZReports}
            />
            <Route
              path={routes.catalog}
              component={Catalog}
            />
            <Route
              path={routes.sellers}
              component={Sellers}
            />
            <Route
              path={routes.ticketReports}
              component={TicketReports}
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
