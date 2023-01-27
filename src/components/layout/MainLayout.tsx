import React, { useEffect, useState } from 'react';
import { Layout, Menu, Modal, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import connect from 'react-redux/es/components/connect';
import { useHistory } from 'react-router-dom';
import { MenuProps } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  TableOutlined,
  SettingOutlined,
  BranchesOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { routes } from '../../constants/routes';
import useAuth from '../../contexts/auth/hook';
import { setAuth } from '../../reudux/auth/action';
import { setDashboardAccessOnly } from '../../reudux/settings/action';
import GlobalLoader from '../GlobalLoader/GlobalLoader';

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
};

const MainLayout = ({ children, isAuth }: LayoutProps) => {
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
      getItem(t('navMenu.targetReports'), routes.targetReports)
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

  const itemsLogout: MenuItem[] = [getItem(t('navMenu.logOut'), routes.signIn, null)];

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
    localStorage.removeItem('token');
    dispatch(setAuth(false));
    history.push('/');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onLogout);
    return () => window.removeEventListener('beforeunload', onLogout);
  });
  return (
    <Layout className="min-h-screen">
      <GlobalLoader />
      {isAuth ? (
        <Sider
          width={250}
          className="text-[#fff]"
        >
          <div>
            <Menu
              onClick={(e) => onMenuItemClick(e.key)}
              defaultSelectedKeys={[getDefaultSelectedKey()]}
              mode="inline"
              theme="dark"
              items={isDashboardAccessOnly ? itemsLogout : items}
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
  isAuth: state.auth.isAuth
});

export default connect(mapState, {})(MainLayout);
