import React, { useEffect, useState } from 'react';
import { Layout, Button } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import { ISubscribeReport, RESPONSE_STATUSES } from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import Filters from '../../../filters/FIlters';
import { getCouponTableColumns } from './columns';
import { getSalesFilters } from './filters';
import { FileExcelFilled, ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

const SubscribeReports: React.FC<any> = () => {
  const { t } = useTranslation();
  const [salesReports, setSalesReport] = useState<ISubscribeReport[]>([]);
  const [filtersValues, setFiltersValues] = useState({
    FromCreatedDate: moment().format('DD/MM/yyyy'),
    ToCreatedDate: moment().format('DD/MM/yyyy')
  });

  const onExportToExcel = (filters: any) => {
    API.reports.ticketReports.exportSubscribesToExcel(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK && res.ReportURL) {
        window.open(res.ReportURL, '_blank');
      }
    });
  };

  const getSubscribeReports = (filters: any) => {
    API.reports.getSubscribeReports(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setSalesReport(res.List);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      getSubscribeReports(filtersValues);
    }
  }, [filtersValues]);

  return (
    <Layout>
      <Filters
        filters={getSalesFilters()}
        onChange={setFiltersValues}
        filtersValues={filtersValues}
      />
      <div className="relative">
        <Button
          icon={<ReloadOutlined />}
          onClick={() => getSubscribeReports(filtersValues)}
          type="primary"
          className="userDailyStatsBtn"
        />
        <Button
          icon={<FileExcelFilled />}
          onClick={() => onExportToExcel(filtersValues)}
          type="primary"
          className="exportToExcelBtn"
        >
          {t('exportToExcel')}
        </Button>
        <CustomTable
          data={salesReports}
          columns={getCouponTableColumns(t)}
        />
      </div>
    </Layout>
  );
};

export default SubscribeReports;
