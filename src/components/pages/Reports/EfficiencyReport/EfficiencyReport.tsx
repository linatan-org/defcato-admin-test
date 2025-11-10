import './EfficiencyReport.module.scss';
import { CalendarOutlined, FileExcelFilled, ReloadOutlined } from '@ant-design/icons';
import { Radio, DatePicker, DatePickerProps, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import moment, { Moment } from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import {
  IEfficiencyCancelsByReason,
  IEfficiencyCancelsByUser,
  IEfficiencyData,
  OrdersReportsEnum,
  RESPONSE_STATUSES
} from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import { getColumnsByReasonMain, getColumnsByUserMain, getColumnsByReason, getColumnsByUser } from './columns';
import EfficiencyCard from './EfficiencyCard';

enum REASON_TYPE {
  BY_USER,
  BY_REASON
}
export const EfficiencyReport = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(REASON_TYPE.BY_USER);
  const [selectedDateMoment, setSelectedDateMoment] = useState<Moment | null>(moment());
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('DD-MM-YYYY'));
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
  const onExportToExcel = () => {
    API.reports.orderReports
      .exportOrdersToExcel({ SelectedDate: selectedDate }, OrdersReportsEnum.EFFICIENCY_REPORT)
      .then((res) => {
        console.log(res);
        if (res.ErrorCode === RESPONSE_STATUSES.OK && res.ReportURL) {
          window.open(res.ReportURL, '_blank');
        }
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
  const onExpand = useCallback(
    (expanded: boolean, record: IEfficiencyCancelsByReason | IEfficiencyCancelsByUser) => {
      if (!expanded) {
        setExpandedKeys([]);
        setDetailsData([]);
        return;
      }
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
      request(record[idKey], selectedDate, idKey).then((res) => {
        if (isByUser) {
          // @ts-ignore
          setDetailsData(res.CancelsByReason);
        } else {
          // @ts-ignore
          setDetailsData(res.CancelsByUser);
        }
      });
    },
    [setExpandedKeys, setDetailsData, selectedTab]
  );
  return (
    <div className="ticketReportsWrapper">
      <div className="datepickerWrap">
        <DatePicker
          className="w-full datePicker"
          value={selectedDateMoment}
          placeholder={t('dashboard.datePickerPlaceholder')}
          format="DD-MM-YYYY"
          onChange={onChange}
          suffixIcon={<CalendarOutlined className="datePicker_icon" />}
        />
      </div>
      {efficiencyData ? (
        <EfficiencyCard
          dailyStats={efficiencyData?.Data}
          t={t}
        />
      ) : null}
      <Radio.Group
        className="mt-5 mb-5"
        onChange={onChangeTab}
        value={selectedTab}
      >
        <Radio value={REASON_TYPE.BY_USER}>{t('reports.efficiencyReports.ViewByUser')}</Radio>
        <Radio value={REASON_TYPE.BY_REASON}>{t('reports.efficiencyReports.ViewByReason')}</Radio>
      </Radio.Group>
      <div className="relative flex-1">
        <Button
          icon={<FileExcelFilled />}
          onClick={() => onExportToExcel()}
          type="primary"
          className="exportToExcelBtn"
          disabled={
            selectedTab === REASON_TYPE.BY_USER
              ? efficiencyData?.CancelsByUser?.length === 0
              : efficiencyData?.CancelsByReason?.length === 0
          }
        >
          {t('exportToExcel')}
        </Button>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => getDailyEfficiency(selectedDate)}
          type="primary"
          className="userDailyStatsBtn"
        />
        <CustomTable
          data={
            selectedTab === REASON_TYPE.BY_USER ? efficiencyData?.CancelsByUser || [] : efficiencyData?.CancelsByReason || []
          }
          columns={selectedTab === REASON_TYPE.BY_USER ? getColumnsByUserMain(t) : getColumnsByReasonMain(t)}
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
