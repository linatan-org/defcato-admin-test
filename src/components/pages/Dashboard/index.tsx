import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API } from '../../../server';
import { IDailyStatsData, IDailyUserStatsData, IDailyUserTargetsData, RESPONSE_STATUSES } from '../../../server/models';
import MainLayout from '../../layout/MainLayout';
import { Redirect } from 'react-router-dom';
import DashboardCard from './Card';
import CustomTable from './CustomTable';
import DashboardTargetProgress from './TargetProgress';
import { getDashboardCardsValues, getDashboardTableValues } from './values';

const Dashboard = () => {
  const { t } = useTranslation();
  const dashboardCardsData = getDashboardCardsValues(t);
  const [checkedUserIdx, setCheckedUserIdx] = useState<number>(-1);
  const [dailyStats, setDailyStats] = useState<IDailyStatsData | null>(null);
  const [dailyUserStats, setDailyUserStats] = useState<IDailyUserStatsData[]>([]);
  const [dailyUserTargets, setDailyUserTargets] = useState<IDailyUserTargetsData[] | null>(null);

  useEffect(() => {
    API.dashboard.getDailyStat().then((res) => {
      setDailyStats(res.Data);
    });
    API.dashboard.getDailyUserStat().then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setDailyUserStats(res.List);
        if (res.List.length) {
          setCheckedUserIdx(res.List[0].DeviceSysId);
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log(checkedUserIdx);
    if (checkedUserIdx !== -1) {
      API.dashboard.getDailyUserTargets(checkedUserIdx).then((res) => {
        setDailyUserTargets(res.List);
        console.log(res, 'REPONSE');
      });
    }
  }, [checkedUserIdx]);

  if (!sessionStorage.token) return <Redirect to={'/'} />;
  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {dashboardCardsData.map((data, index) => (
          <DashboardCard
            key={index}
            data={data}
            dailyStats={dailyStats}
          />
        ))}
      </div>
      <CustomTable
        data={dailyUserStats}
        columns={getDashboardTableValues(t)}
        setActiveUserIxd={setCheckedUserIdx}
        checkedUserDeviceSysId={checkedUserIdx}
        activeKey={'DeviceSysId'}
      />
      <div className="flex flex-wrap justify-center gap-6">
        {dailyUserTargets &&
          dailyUserTargets.map((value, index) => (
            <DashboardTargetProgress
              key={index}
              title={value.Description}
              value={value.CurrentPercent}
            />
          ))}
      </div>
    </>
  );
};
export default Dashboard;
