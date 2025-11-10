/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Card, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { IDailyStatsData } from '../../../../server/models';
import './styles.scss';

interface Interface {
  data: { key: string; title: string }[];
  dailyStats?: IDailyStatsData | null;
}

const DashboardCard: React.FC<Interface> = ({ data, dailyStats }) => (
  <div className="site-card-border-less-wrapper card">
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
          } flex gap-10 text-[16px] align-center justify-between`}
        >
          <p>{value?.title}</p>
          <span>{dailyStats && (dailyStats as any)[value.key]}</span>
        </div>
      ))}
    </Card>
  </div>
);

export default DashboardCard;
