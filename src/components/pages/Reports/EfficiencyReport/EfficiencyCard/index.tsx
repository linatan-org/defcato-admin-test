/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Card, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import './styles.scss';
import { IEfficiencyTotal } from '../../../../../server/models';

interface Interface {
  dailyStats?: IEfficiencyTotal;
  t: any;
}

const DISPLAY_KEYS = ['IncomingCalls', 'TotalOrders', 'NotCompletedOrders', 'CallsOrdersConversion'];

const EfficiencyCard: React.FC<Interface> = ({ dailyStats, t }) => (
  <div className="site-card-border-less-wrapper card mt-5">
    <Card bodyStyle={{ padding: '20px 24px 8px' }}>
      {DISPLAY_KEYS.map((key, index) => (
        <div
          key={index}
          className={`${
            index === 2 ? 'border-t-[1px] border-[#f0f0f0] mt-2' : ''
          } flex gap-10 text-[16px] align-center justify-between`}
        >
          <p>{t(`reports.efficiencyReports.${key}`)}</p>
          {/*// @ts-ignore*/}
          <span>{dailyStats[key]}</span>
        </div>
      ))}
    </Card>
  </div>
);

export default EfficiencyCard;
