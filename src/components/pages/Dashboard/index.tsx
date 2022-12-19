import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import { API } from '../../../server';
import { IDailyStatsData, IDailyUserStatsData, IDailyUserTargetsData, RESPONSE_STATUSES } from '../../../server/models';
import { Redirect } from 'react-router-dom';
import moment, { Moment } from 'moment';
import DashboardCard from './Card';
import CustomTable from './CustomTable';
import DashboardTargetProgress from './TargetProgress';
import { getDashboardCardsValues, getDashboardTableValues } from './values';
import { CalendarOutlined, ReloadOutlined } from '@ant-design/icons';

import './styles.scss';

type DATA_TYPE = 'DAILY_STATS' | 'USER_DAILY_STATS' | 'DAILY_USER_TARGETS';

const Dashboard = () => {
  const { t } = useTranslation();
  const dashboardCardsData = getDashboardCardsValues(t);
  const [checkedUserIdx, setCheckedUserIdx] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('DD/MM/yyyy'));
  const [selectedDateMoment, setSelectedDateMoment] = useState<Moment | null>(moment());
  const [dailyStats, setDailyStats] = useState<IDailyStatsData | null>(null);
  const [dailyUserStats, setDailyUserStats] = useState<IDailyUserStatsData[]>([]);
  const [dailyUserTargets, setDailyUserTargets] = useState<IDailyUserTargetsData[] | null>(null);

  const getDailyStat = (selectedDate: string) => {
    API.dashboard.getDailyStat(selectedDate).then((res) => {
      setDailyStats(res.Data);
    });
  };

  const getDailyUserStat = (selectedDate: string) => {
    API.dashboard.getDailyUserStat(selectedDate).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setDailyUserStats(res.List);
        if (res.List.length) {
          setCheckedUserIdx(res.List[0].SelleCode);
        }
      }
    });
  };

  const getDailyUserTargets = (checkedUserIdx: string, selectedDate: string) => {
    API.dashboard.getDailyUserTargets(checkedUserIdx, selectedDate).then((res) => {
      setDailyUserTargets(res.List);
    });
  };

  useEffect(() => {
    getDailyStat(selectedDate);
    getDailyUserStat(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (checkedUserIdx !== '') {
      getDailyUserTargets(checkedUserIdx, selectedDate);
    }
  }, [checkedUserIdx, selectedDate]);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setCheckedUserIdx('');
    setSelectedDateMoment(date);
    setSelectedDate(dateString);
  };

  const update = (type: DATA_TYPE) => {
    switch (type) {
      case 'DAILY_STATS': {
        getDailyStat(selectedDate);
        return;
      }
      case 'USER_DAILY_STATS': {
        getDailyUserStat(selectedDate);
        return;
      }
      case 'DAILY_USER_TARGETS': {
        getDailyUserTargets(checkedUserIdx, selectedDate);
        return;
      }
    }
  };

  if (!sessionStorage.token) return <Redirect to={'/'} />;
  return (
    <>
      <div className="datepickerWrap">
        <DatePicker
          className="w-full datePicker"
          value={selectedDateMoment}
          placeholder={t('dashboard.datePickerPlaceholder')}
          format="DD/MM/yyyy"
          onChange={onChange}
          suffixIcon={<CalendarOutlined className="datePicker_icon" />}
        />
      </div>
      <div className="block">
        <Button
          icon={<ReloadOutlined />}
          onClick={() => update('DAILY_STATS')}
          type="primary"
          className="userDailyStatsBtn"
        />
        <div className="flex items-center justify-around">
          {dashboardCardsData.map((data, index) => (
            <DashboardCard
              key={index}
              data={data}
              dailyStats={dailyStats}
            />
          ))}
        </div>
      </div>
      <div className="relative">
        <Button
          icon={<ReloadOutlined />}
          onClick={() => update('USER_DAILY_STATS')}
          type="primary"
          className="userDailyStatsBtn"
        />
        <CustomTable
          data={dailyUserStats}
          columns={getDashboardTableValues(t)}
          setActiveUserIxd={setCheckedUserIdx}
          checkedUserDeviceSysId={checkedUserIdx}
          activeKey={'DeviceSysId'}
        />
      </div>
      <div className="block">
        <Button
          icon={<ReloadOutlined />}
          onClick={() => update('DAILY_USER_TARGETS')}
          type="primary"
          className="userDailyStatsBtn"
        />
        <div className="flex flex-wrap justify-center gap-6">
          {dailyUserTargets &&
            dailyUserTargets.map((value, index) => (
              <DashboardTargetProgress
                key={index}
                t={t}
                title={value.Description}
                value={value.CurrentPercent}
              />
            ))}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
