import React, { useEffect, useState } from 'react';
import { DatePicker, Space, Layout, Button } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import { ISalesReport, RESPONSE_STATUSES } from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import Filters from '../../../filters/FIlters';
import { getSaleReportsTableColumns } from './columns';
import { getSalesFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

const SalesReports: React.FC<any> = () => {
  const { t } = useTranslation();
  const [salesReports, setSalesReport] = useState<ISalesReport[]>([]);
  const [filtersValues, setFiltersValues] = useState({
    FromDate: moment().format('DD/MM/yyyy'),
    ToDate: moment().format('DD/MM/yyyy')
  });

  const getSaleReports = (filters: any) => {
    API.reports.getSalesReports(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setSalesReport(res.List);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      getSaleReports(filtersValues);
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
          onClick={() => getSaleReports(filtersValues)}
          type="primary"
          className="userDailyStatsBtn"
        />
        <CustomTable
          data={salesReports}
          columns={getSaleReportsTableColumns(t)}
        />
      </div>
    </Layout>
  );
};

export default SalesReports;
