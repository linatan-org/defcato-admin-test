import React, { useEffect, useState } from 'react';
import { Layout, Button, Table, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import { ICoupon, RESPONSE_STATUSES } from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import Filters from '../../../filters/FIlters';
import { getCouponTableColumns } from './columns';
import { getSalesFilters } from './filters';
import { FileExcelFilled, ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

const { Text } = Typography;

const CouponReports: React.FC<any> = () => {
  const { t } = useTranslation();
  const [salesReports, setSalesReport] = useState<ICoupon[]>([]);
  const [filtersValues, setFiltersValues] = useState({
    FromCreatedDate: moment().format('DD/MM/yyyy'),
    ToCreatedDate: moment().format('DD/MM/yyyy')
  });

  const [totalRecords, setTotalRecords] = useState<{
    TotalAfterVat: number;
    TotalRecords: number;
  }>({
    TotalRecords: 0,
    TotalAfterVat: 0
  });

  const onExportToExcel = (filters: any) => {
    API.reports.ticketReports.exportTicketsToExcel(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK && res.ReportURL) {
        window.open(res.ReportURL, '_blank');
      }
    });
  };

  const getSaleReports = (filters: any) => {
    API.reports.getCouponReports(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setSalesReport(res.List);
        setTotalRecords({
          TotalAfterVat: res.TotalAfterVat,
          TotalRecords: res.TotalRecords
        });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      getSaleReports(filtersValues);
    }
  }, [filtersValues]);

  const getTabletSummary = () => {
    return (
      <Table.Summary fixed="bottom">
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>
            <Text strong>
              {t('TotalRecords')}: {totalRecords.TotalRecords}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            <Text strong>
              {t('TotalAfterVat')}: {totalRecords.TotalAfterVat}
            </Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
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
          icon={<ReloadOutlined />}
          onClick={() => getSaleReports(filtersValues)}
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
          summary={getTabletSummary}
        />
      </div>
    </Layout>
  );
};

export default CouponReports;
