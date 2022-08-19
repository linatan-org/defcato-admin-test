import React from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined
} from '@ant-design/icons';

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

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),

  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8')
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),

    getItem('Submenu', 'sub3', null, [
      getItem('Option 11', '11'),
      getItem('Option 12', '12')
    ])
  ])
];

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-[#fff] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]">
        Header
      </Header>
      <Layout>
        <Sider
          width={250}
          className="text-[#fff]"
        >
          <div>
            <Menu
              defaultSelectedKeys={['1']}
              mode="inline"
              theme="dark"
              items={items}
            />
          </div>
        </Sider>
        <Content className="flex flex-col min-h-screen gap-6 p-6">
          {children}
        </Content>
      </Layout>
      <Footer className="bg-[#fff] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]">
        Footer
      </Footer>
    </Layout>
  );
};

export default MainLayout;
