import MainLayout from '../../layout/MainLayout';
import { Redirect } from 'react-router-dom';
import DashboardCard from './Card';
import DashboardTable from './Table';
import DashboardTargetProgress from './TargetProgress';

const Dashboard = () => {
  if (!sessionStorage.token) return <Redirect to={'/'} />;
  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-6">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
      <DashboardTable />
      <div className="flex flex-wrap justify-center gap-6">
        <DashboardTargetProgress />
        <DashboardTargetProgress />
        <DashboardTargetProgress />
        <DashboardTargetProgress />
        <DashboardTargetProgress />
      </div>
    </MainLayout>
  );
};
export default Dashboard;
