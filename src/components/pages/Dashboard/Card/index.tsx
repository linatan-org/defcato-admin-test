/* eslint-disable react/no-unescaped-entities */
import { Card, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import React from 'react';

const DashboardCard: React.FC = () => (
  <div className="site-card-border-less-wrapper">
    <Card bodyStyle={{ padding: '20px 24px 8px' }}>
      <div className="flex">
        <Tooltip
          color="blue"
          className="cursor-pointer d-inline"
          placement="top"
          title="text"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
      <div className="flex gap-10 text-[20px] align-center justify-between">
        <p>סה"כ הזמנות</p>
        <span>text</span>
      </div>
      <div className="flex gap-10 text-[20px] align-center justify-between">
        <p> כמות הזמנות </p>
        <span>text</span>
      </div>
      <div className="border-t-[1px] border-[#f0f0f0] mt-2">
        <div className="flex gap-10 text-[20px] align-center justify-between">
          <p> שעת הזמנה אחרונה </p>
          <span>text</span>
        </div>
      </div>
    </Card>
  </div>
);

export default DashboardCard;
