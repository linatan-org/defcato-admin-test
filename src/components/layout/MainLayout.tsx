import React, { useEffect, useState } from 'react';
import { Layout, Menu, Modal, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import connect from 'react-redux/es/components/connect';
import { useHistory } from 'react-router-dom';
import { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { errors } from '../../constants/errors';
import { routes } from '../../constants/routes';
import { setAuth } from '../../reudux/auth/action';
import { setLoading } from '../../reudux/globalLoader/action';
import { setDashboardAccessOnly, setTechnicalSupportAccess } from '../../reudux/settings/action';
import { apiConfig } from '../../server';
import GlobalLoader from '../GlobalLoader/GlobalLoader';
import './styles.scss';

const { Sider, Content } = Layout;
const { Text } = Typography;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

type LayoutProps = {
  children: React.ReactNode;
  isAuth: boolean;
  lang: string;
  isTechnicalSupportAccess: boolean;
};

const MainLayout = ({ children, isAuth, lang, isTechnicalSupportAccess }: LayoutProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isShowConfirmLogout, setIsShowConfirmLogout] = useState(false);
  const { isDashboardAccessOnly } = useSelector((state: any) => state.settings);
  const items: MenuItem[] = [
    getItem(t('navMenu.reports'), 'sub1', null, [
      getItem(t('navMenu.currentTradingDay'), routes.dashboard),
      getItem(t('navMenu.salesReport'), routes.salesReports),
      getItem(t('navMenu.zReport'), routes.zReports),
      getItem(t('navMenu.ticketReports'), routes.ticketReports),
      getItem(t('navMenu.ordersReports'), routes.ordersReports),
      getItem(t('navMenu.targetReports'), routes.targetReports),
      getItem(t('navMenu.efficiencyReport'), routes.efficiencyReport),
      getItem(t('navMenu.couponReports'), routes.couponReport),
      getItem(t('navMenu.timeReport'), routes.timeReport),
      getItem(t('navMenu.activityReports'), routes.activityReport),
      getItem(t('navMenu.subscribeReports'), routes.subscribeReport)
      // getItem(t('navMenu.itemsReport'), '6')
    ]),
    getItem(t('navMenu.settings'), 'sub2', null, [
      getItem(t('navMenu.keyboardList'), routes.keyboardList),
      getItem(t('navMenu.paymentKeyboardEditor'), routes.paymentsEditor),
      getItem(t('navMenu.dailyInstruction'), routes.dailyInstructionEditor),
      getItem(t('navMenu.catalog'), routes.catalog),
      getItem(t('navMenu.sellers'), routes.sellers)
    ]),
    getItem(t('navMenu.logOut'), routes.signIn, null)
  ];
  // TODO Refactor to provider
  useEffect(() => {
    apiConfig.interceptors.request.use(
      (config: any) => {
        if (config?.data) {
          Object.keys(config?.data).forEach((key) => {
            if (key.includes('Date')) {
              const isDateKey = key.includes('Date');
              if (isDateKey) {
                const replacedDate = config?.data[key].replaceAll('-', '/');
                // @ts-ignore
                config.data[key] = replacedDate;
              }
            }
          });
        }
        dispatch(setLoading(true));
        return config;
      },
      (error) => Promise.reject(error)
    );

    apiConfig.interceptors.response.use(
      (response) => {
        dispatch(setLoading(false));
        if (response.data.ErrorCode !== 0) {
          const messageObj = errors.find((e) => e.code === response.data.ErrorCode);
          // @ts-ignore
          const message = messageObj ? messageObj[lang] : response.data.ErrorMessage;
          toast.error(message, { className: 'toastError' });
        }
        return Promise.resolve(response);
      },
      (error) => {
        dispatch(setLoading(false));
        return Promise.reject(error);
      }
    );
  }, []);

  const getDefaultSelectedKey = () => {
    const currentPath = history.location.pathname;
    const matchedRoute = Object.keys(routes).find((k: string) => {
      return (routes as any)[k].includes(currentPath);
    });
    return matchedRoute === routes.signIn
      ? routes.dashboard
      : (matchedRoute && (routes as any)[matchedRoute]) || routes.dashboard;
  };

  const onMenuItemClick = (key: string) => {
    if (key === routes.signIn) {
      setIsShowConfirmLogout(true);
      return;
    }
    history.push(key);
  };

  const onLogout = () => {
    setIsShowConfirmLogout(false);
    dispatch(setDashboardAccessOnly(false));
    dispatch(setTechnicalSupportAccess(false));
    localStorage.removeItem('token');
    dispatch(setAuth(false));
    history.push('/');
  };

  useEffect(() => {
    if (isDashboardAccessOnly) {
      window.addEventListener('beforeunload', onLogout);
    }
    return () => window.removeEventListener('beforeunload', onLogout);
  });
  return (
    <Layout
      className="min-h-screen"
      dir={lang === 'he' ? 'rtl' : 'ltr'}
    >
      <GlobalLoader />
      {isAuth && !isDashboardAccessOnly ? (
        <Sider
          width={250}
          className="text-[#fff]"
        >
          <div>
            <Menu
              className={lang === 'he' ? 'rtl-menu' : ''}
              onClick={(e) => onMenuItemClick(e.key)}
              defaultSelectedKeys={[getDefaultSelectedKey()]}
              mode="inline"
              theme="dark"
              items={!isTechnicalSupportAccess ? items : [getItem(t('navMenu.logOut'), routes.signIn, null)]}
            />
          </div>
        </Sider>
      ) : null}
      <Content className="flex flex-col min-h-screen gap-6 p-6">{children}</Content>
      <Modal
        title={t('navMenu.logOut')}
        centered
        visible={isShowConfirmLogout}
        onOk={onLogout}
        onCancel={() => setIsShowConfirmLogout(false)}
        cancelText={t('cancel')}
        okText={t('ok')}
        width={'80%'}
        cancelButtonProps={{
          size: 'large'
        }}
        okButtonProps={{
          size: 'large'
        }}
      >
        <Text strong>{t('areYouSureYouWantLogout')}</Text>
      </Modal>
    </Layout>
  );
};

const mapState = (state: any) => ({
  isAuth: state.auth.isAuth,
  lang: state.configs.lang,
  isTechnicalSupportAccess: state.settings.isTechnicalSupportAccess
});

export default connect(mapState, {})(MainLayout);
