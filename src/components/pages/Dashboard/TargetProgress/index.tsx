import React from 'react';
import { Progress } from 'antd';
import { IDailyStatsData } from '../../../../server/models';
interface TargetProps {
  value: number;
  title: string;
}
const DashboardTargetProgress: React.FC<TargetProps> = ({ value, title }) => (
  <div className="inline-flex flex-col items-center flex-1 self-start gap-3">
    <p className="text-base">{title}</p>
    <Progress
      strokeWidth={9}
      width={100}
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068'
      }}
      type="dashboard"
      strokeLinecap="butt"
      gapDegree={0}
      percent={value}
    />
  </div>
);

export default DashboardTargetProgress;
