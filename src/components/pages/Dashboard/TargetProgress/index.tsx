import React from 'react';
import { Progress } from 'antd';
interface TargetProps {
  value?: number;
}
const DashboardTargetProgress: React.FC<TargetProps> = ({ value }) => (
  <div className="inline-flex flex-col items-center self-start gap-3">
    <p className="text-xl">Target {value || Math.floor(Math.random() * 10)}</p>
    <Progress
      strokeWidth={9}
      width={115}
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068'
      }}
      type="dashboard"
      strokeLinecap="butt"
      gapDegree={0}
      percent={value || Math.floor(Math.random() * 100)}
    />
  </div>
);

export default DashboardTargetProgress;
