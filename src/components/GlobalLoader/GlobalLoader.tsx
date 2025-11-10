import React from 'react';
import { Spin } from 'antd';
import './styles.scss';
import { useSelector } from 'react-redux';

const GlobalLoader = () => {
  const { loading } = useSelector((state: any) => state.globalLoader);
  return loading ? (
    <div className="absolute h-screen w-screen flex items-center justify-center wrapper-loader">
      <Spin size="large" />
    </div>
  ) : null;
};

export default GlobalLoader;
