import React from 'react';
import { Progress } from 'antd';
interface TargetProps {
  value: number;
  title: string;
  t: any;
}
const DashboardTargetProgress: React.FC<TargetProps> = ({ value, title, t }) => (
  <div className="inline-flex flex-col items-center flex-1 self-start gap-3">
    <p className="text-base">{title}</p>
    <Progress
      strokeWidth={5}
      width={100}
      strokeColor={{
        '0%': '#215731',
        '100%': '#215731'
      }}
      type="dashboard"
      strokeLinecap="butt"
      gapDegree={0}
      percent={value}
      // @ts-ignore
      format={(pr: number) => (
        <div className="text-sm">
          <div>100 / {pr}</div>
          {t('dashboard.dailyUserStats.percent')}
        </div>
      )}
    />
  </div>
);

export default DashboardTargetProgress;
