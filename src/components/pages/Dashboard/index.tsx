import { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Redirect } from 'react-router-dom';
import DashboardCard from './Card';
import DashboardTable from './Table';
import DashboardTargetProgress from './TargetProgress';

const taregtsMockData = [
  [10, 20, 30, 40, 50],
  [25, 69, 30, 35, 77],
  [4, 67, 88, 45, 24],
  [15, 79, 100, 23, 56]
];
const Dashboard = () => {
  const [checkedUserIdx, setCheckedUserIdx] = useState(0);
  if (!sessionStorage.token) return <Redirect to={'/'} />;
  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-6">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
      <DashboardTable setActiveUserIxd={setCheckedUserIdx} />
      <div className="flex flex-wrap justify-center gap-6">
        {taregtsMockData[checkedUserIdx].map((value, index) => (
          <DashboardTargetProgress
            key={index}
            value={value}
          />
        ))}
      </div>
    </MainLayout>
  );
};
export default Dashboard;
