import React, { useEffect, useState } from 'react';
import { DatePicker, Space, Layout, Button, Modal } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import { IOrderFilterValues, ISalesReport, ISalesReportsDetails, RESPONSE_STATUSES } from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import Filters from '../../../filters/FIlters';
import { ZReportDetails } from '../ZReports/components/ZReportDetails/ZReportDetails';
import { getSaleReportsTableColumns } from './columns';
import { SaleDetailsReport } from './components/SaleDetailsReport/SaleDetailsReport';
import { getSalesFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

const SalesReports: React.FC<any> = () => {
  const { t } = useTranslation();
  const [salesReports, setSalesReport] = useState<ISalesReport[]>([]);
  const [checkedSalesReport, setCheckedSalesReport] = useState<ISalesReport | null>(null);
  const [salesReportDetails, setSalesReportDetails] = useState<ISalesReportsDetails | null>(null);
  const [ordersFiltersOptions, setOrdersFiltersOptions] = useState<IOrderFilterValues | null>(null);
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
    API.reports.orderReports.getOrderFilters().then((filters) => {
      if (filters.ErrorCode === RESPONSE_STATUSES.OK) {
        setOrdersFiltersOptions(filters);
      }
    });
  }, []);

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      getSaleReports(filtersValues);
    }
  }, [filtersValues]);

  useEffect(() => {
    if (checkedSalesReport) {
      API.reports.getSalesReportDetails(checkedSalesReport).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK && res.Transaction) {
          setSalesReportDetails(res.Transaction);
        }
      });
    } else {
      setSalesReportDetails(null);
    }
  }, [checkedSalesReport]);

  const modalActionButtons = () => {
    return [
      <div
        key="wrapper"
        className="actions-button-wrapper"
      >
        <Button
          type="primary"
          className="w-36 h-12"
          key={t('reports.ZReports.ZReportDetails.Exit')}
          onClick={() => setCheckedSalesReport(null)}
        >
          {t('reports.ZReports.ZReportDetails.Exit')}
        </Button>
      </div>
    ];
  };

  return (
    <Layout>
      <Filters
        filters={getSalesFilters(ordersFiltersOptions, t)}
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
          columns={getSaleReportsTableColumns(t, setCheckedSalesReport)}
          onDoubleClick={setCheckedSalesReport}
        />
      </div>
      <Modal
        className="modalStyle"
        width={1200}
        title={t('reports.saleReports.salesReportDetails.salesReportDetailsTitle')}
        centered
        visible={!!salesReportDetails}
        onOk={() => {}}
        onCancel={() => setCheckedSalesReport(null)}
        footer={modalActionButtons()}
      >
        {salesReportDetails ? <SaleDetailsReport saleReport={salesReportDetails} /> : null}
      </Modal>
    </Layout>
  );
};

export default SalesReports;
