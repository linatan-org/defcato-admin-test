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
      <div>
        <p className="flex gap-10 text-[20px] align-center">
          סה"כ הזמנות <span>text</span>
        </p>
      </div>
      <div>
        <p className="flex gap-10 text-[20px] align-center">
          כמות הזמנות <span>text</span>
        </p>
      </div>
      <div className="border-t-[1px] border-[#f0f0f0] mt-2">
        <p className="flex gap-10 text-[20px] align-center">
          שעת הזמנה אחרונה <span>text</span>
        </p>
      </div>
    </Card>
  </div>
);

export default DashboardCard;
