import './EfficiencyReport.module.scss';
import { CalendarOutlined, FileExcelFilled, ReloadOutlined } from '@ant-design/icons';
import { Radio, DatePicker, DatePickerProps } from 'antd';
import type { RadioChangeEvent } from 'antd';
import moment, { Moment } from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import {
  IDailyStatsData,
  IEfficiencyCancelsByReason,
  IEfficiencyCancelsByUser,
  IEfficiencyData,
  ITargetReport
} from '../../../../server/models';
import Filters from '../../../filters/FIlters';
import CustomTable from '../../Dashboard/CustomTable';
import TargetReportDetails from '../TargetReport/TargetReportDetails';
import { getColumns, getColumnsByReason, getColumnsByUser } from './columns';
import EfficiencyCard from './EfficiencyCard';

enum REASON_TYPE {
  BY_USER,
  BY_REASON
}
export const EfficiencyReport = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(REASON_TYPE.BY_USER);
  const [selectedDateMoment, setSelectedDateMoment] = useState<Moment | null>(moment());
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('DD/MM/yyyy'));
  const [efficiencyData, setEfficiencyData] = useState<IEfficiencyData>();
  const [detailsData, setDetailsData] = useState<IEfficiencyCancelsByReason[] | IEfficiencyCancelsByUser[]>([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  useEffect(() => {
    if (expandedKeys.length) {
      setExpandedKeys([]);
    }
  }, [selectedTab, selectedDate]);

  useEffect(() => {
    getDailyEfficiency(selectedDate);
  }, [selectedDate]);
  const getDailyEfficiency = (selectedDate: string) => {
    API.reports.efficiencyReports.getDailyEfficiency(selectedDate).then((res) => {
      setEfficiencyData(res);
    });
  };
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setSelectedDateMoment(date);
    setSelectedDate(dateString);
  };
  const onChangeTab = (e: RadioChangeEvent) => {
    setSelectedTab(e.target.value);
  };
  const expandedRowRender = (record: IEfficiencyCancelsByReason | IEfficiencyCancelsByUser) => {
    return (
      <CustomTable
        data={detailsData}
        columns={selectedTab === REASON_TYPE.BY_USER ? getColumnsByUser(t) : getColumnsByReason(t)}
      />
    );
  };
  const onExpand = (expanded: boolean, record: IEfficiencyCancelsByReason | IEfficiencyCancelsByUser) => {
    console.log(record, 'RECORD===');
    const isByUser = selectedTab === REASON_TYPE.BY_USER;
    const idKey = isByUser ? 'DeviceSysId' : 'ReasonSysId';
    const request = isByUser
      ? API.reports.efficiencyReports.getDailyCancelsByUser
      : API.reports.efficiencyReports.getDailyCancelsByReason;
    // @ts-ignore
    const newExpandedKey = [record.key];
    // @ts-ignore
    setExpandedKeys(newExpandedKey);
    // @ts-ignore
    request(record[idKey], selectedDate).then((res) => {
      if (isByUser) {
        // @ts-ignore
        setDetailsData(res.CancelsByReason);
      } else {
        // @ts-ignore
        setDetailsData(res.CancelsByUser);
      }
      console.log(res, 'RESPONSE========');
    });
  };
  console.log(expandedKeys, 'expandedKeys');
  return (
    <div className="ticketReportsWrapper">
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
      <EfficiencyCard
        dailyStats={efficiencyData?.Data}
        t={t}
      />
      <Radio.Group
        className="mt-5 mb-5"
        onChange={onChangeTab}
        value={selectedTab}
      >
        <Radio value={REASON_TYPE.BY_USER}>{t('reports.efficiencyReports.ViewByUser')}</Radio>
        <Radio value={REASON_TYPE.BY_REASON}>{t('reports.efficiencyReports.ViewByReason')}</Radio>
      </Radio.Group>
      <div className="relative flex-1">
        <CustomTable
          data={
            selectedTab === REASON_TYPE.BY_USER ? efficiencyData?.CancelsByUser || [] : efficiencyData?.CancelsByReason || []
          }
          columns={getColumns(t)}
          expandRowByClick
          expandable={{ expandedRowRender, onExpand }}
          expandedRowKeys={expandedKeys}
          // scrollSize={tableHeight}
          // @ts-ignore
          // summary={getTabletSummary}
        />
      </div>
    </div>
  );
};
