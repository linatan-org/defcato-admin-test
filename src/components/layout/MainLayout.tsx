import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { MenuProps } from 'antd';
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { routes } from '../../constants/routes';

const { Header, Footer, Sider, Content } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
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
  const items: MenuItem[] = [
    getItem(t('navMenu.currentTradingDay'), routes.dashboard, <PieChartOutlined />),
    getItem(t('navMenu.reports'), 'sub1', <MailOutlined />, [getItem(t('navMenu.salesReport'), routes.salesReports), getItem(t('navMenu.itemsReport'), '6')]),
    getItem(t('navMenu.settings'), '7', <PieChartOutlined />)
  ];
  return (
    <Layout className="min-h-screen">
      {/*<Header className="bg-[#fff] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]">*/}
      {/*Header*/}
      {/*</Header>*/}
      <Layout>
        <Sider
          width={250}
          className="text-[#fff]"
        >
          <div>
            <Menu
              onClick={(e) => history.push(e.key)}
              defaultSelectedKeys={[routes.dashboard]}
              mode="inline"
              theme="dark"
              items={items}
            />
          </div>
        </Sider>
        <Content className="flex flex-col min-h-screen gap-6 p-6">{children}</Content>
      </Layout>
      {/*<Footer className="bg-[#fff] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]">*/}
      {/*Footer*/}
      {/*</Footer>*/}
    </Layout>
  );
};

export default MainLayout;
