import React, { useCallback, useEffect, useState } from 'react';
import { Button, Layout } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import { ITimeReport, OrdersReportsEnum, RESPONSE_STATUSES } from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import Filters from '../../../filters/FIlters';
import { getColumns, getDetailsColumns } from './columns';
import { getSalesFilters } from './filters';
import { FileExcelFilled, ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

const TimeReport: React.FC<any> = () => {
  const { t } = useTranslation();
  const [timeReport, setTimeReports] = useState<ITimeReport[]>([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [filtersValues, setFiltersValues] = useState({
    FromDate: moment().format('DD-MM-YYYY'),
    ToDate: moment().format('DD-MM-YYYY')
  });
  useEffect(() => {
    if (expandedKeys.length) {
      setExpandedKeys([]);
    }
  }, [filtersValues]);

  const getSaleReports = (filters: any) => {
    API.reports.getTimeReport(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setTimeReports(res.Employees);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      getSaleReports(filtersValues);
    }
  }, [filtersValues]);

  const onExpand = useCallback(
    (expanded: boolean, record: ITimeReport) => {
      if (!expanded) {
        setExpandedKeys([]);
        return;
      }
      // @ts-ignore
      setExpandedKeys([record.key]);
    },
    [setExpandedKeys]
  );

  const expandedRowRender = useCallback((record: ITimeReport) => {
    return (
      <CustomTable
        data={record.Shifts || []}
        columns={getDetailsColumns(t)}
      />
    );
  }, []);

  const onExportToExcel = (filters: any) => {
    API.reports.orderReports.exportOrdersToExcel(filters, OrdersReportsEnum.TIME_REPORTS).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK && res.ReportURL) {
        window.open(res.ReportURL, '_blank');
      }
    });
  };

  return (
    <Layout>
      <Filters
        filters={getSalesFilters()}
        onChange={setFiltersValues}
        filtersValues={filtersValues}
      />
      <div className="relative">
        <Button
          icon={<FileExcelFilled />}
          onClick={() => onExportToExcel(filtersValues)}
          type="primary"
          className="exportToExcelBtn"
          disabled={timeReport.length === 0}
        >
          {t('exportToExcel')}
        </Button>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => getSaleReports(filtersValues)}
          type="primary"
          className="userDailyStatsBtn"
        />
        <CustomTable
          expandRowByClick
          data={timeReport}
          expandable={{ expandedRowRender, onExpand }}
          expandedRowKeys={expandedKeys}
          columns={getColumns(t)}
        />
      </div>
    </Layout>
  );
};

export default TimeReport;
