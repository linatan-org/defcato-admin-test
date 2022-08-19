/* eslint-disable react/no-unescaped-entities */
import { Card, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import React from 'react';

interface Interface {
  data: { value: string; title: string }[];
}

const DashboardCard: React.FC<Interface> = ({ data }) => (
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
      {data.map((value, index) => (
        <div
          key={index}
          className={`${
            index === 2 ? 'border-t-[1px] border-[#f0f0f0] mt-2' : ''
          } flex gap-10 text-[20px] align-center justify-between`}
        >
          <p>{value.title}</p>
          <span>{value.value}</span>
        </div>
      ))}
    </Card>
  </div>
);

export default DashboardCard;
