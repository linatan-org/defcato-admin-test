import React from 'react';
type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  return <main role="main">{children} </main>;
};

export default MainLayout;
