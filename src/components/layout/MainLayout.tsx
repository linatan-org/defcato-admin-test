import { Html5Outlined } from '@ant-design/icons/lib';
import React from 'react';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
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
import GlobalLoader from '../GlobalLoader/GlobalLoader';

const { Header, Footer, Sider, Content } = Layout;
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
};

const MainLayout = ({ children }: LayoutProps) => {
  const { t } = useTranslation();
  const history = useHistory();
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
    ])
  ];

  const getDefaultSelectedKey = () => {
    const currentPath = history.location.pathname;
    const matchedRoute = Object.keys(routes).find((k: string) => {
      return (routes as any)[k].includes(currentPath);
    });
    return matchedRoute === routes.signIn
      ? routes.dashboard
      : (matchedRoute && (routes as any)[matchedRoute]) || routes.dashboard;
  };

  return (
    <Layout className="min-h-screen">
      <GlobalLoader />
      {!isDashboardAccessOnly ? (
        <Sider
          width={250}
          className="text-[#fff]"
        >
          <div>
            <Menu
              onClick={(e) => history.push(e.key)}
              defaultSelectedKeys={[getDefaultSelectedKey()]}
              mode="inline"
              theme="dark"
              items={items}
            />
          </div>
        </Sider>
      ) : null}
      <Content className="flex flex-col min-h-screen gap-6 p-6">{children}</Content>
    </Layout>
  );
};

export default MainLayout;
