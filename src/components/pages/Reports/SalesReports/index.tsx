import React, { useEffect, useState } from 'react';
import { DatePicker, Space, Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import { ISalesReport, RESPONSE_STATUSES } from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import Filters from '../../../filters/FIlters';
import { getSaleReportsTableColumns } from './columns';
import { getSalesFilters } from './filters';

const SalesReports: React.FC<any> = () => {
  const { t } = useTranslation();
  const [salesReports, setSalesReport] = useState<ISalesReport[]>([]);
  const [filtersValues, setFiltersValues] = useState({});

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      API.reports.getSalesReports(filtersValues).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          setSalesReport(res.List);
        }
        console.log(res, ' RESPNSE SALES');
      });
    }
  }, [filtersValues]);
  return (
    <Layout>
      <Filters
        filters={getSalesFilters()}
        onChange={setFiltersValues}
        filtersValues={filtersValues}
      />
      <CustomTable
        data={salesReports}
        columns={getSaleReportsTableColumns(t)}
      />
    </Layout>
  );
};

export default SalesReports;
