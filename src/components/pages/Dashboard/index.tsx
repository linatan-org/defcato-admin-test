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

const dashboardCardsData = [
  [
    {
      title: 'סה"כ הזמנות',
      value: '2,800'
    },
    {
      title: 'כמות הזמנות',
      value: '26'
    },
    {
      title: 'שעת הזמנה אחרונה',
      value: '14:45'
    }
  ],
  [
    {
      title: 'ממוצע להזמנה',
      value: '1,200'
    },
    {
      title: 'כמות הזמנות לשעה',
      value: '20'
    },
    {
      title: 'פדיון שעתי',
      value: '1200'
    }
  ],
  [
    {
      title: 'שיחות נכנסות',
      value: '1,200'
    },
    {
      title: 'ממוצע שיחות לשעה',
      value: '20'
    },
    {
      title: 'אחוז סגירת שיחות',
      value: '10%'
    }
  ]
];

const Dashboard = () => {
  const [checkedUserIdx, setCheckedUserIdx] = useState(0);
  if (!sessionStorage.token) return <Redirect to={'/'} />;
  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-6">
        {dashboardCardsData.map((data, index) => (
          <DashboardCard
            key={index}
            data={data}
          />
        ))}
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
