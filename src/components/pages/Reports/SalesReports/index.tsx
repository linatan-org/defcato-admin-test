import React, { useEffect, useState } from 'react';
import { Layout, Button, Modal, Table, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import { IOrderFilterValues, ISalesReport, ISalesReportsDetails, RESPONSE_STATUSES } from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import Filters from '../../../filters/FIlters';
import { getSaleReportsTableColumns } from './columns';
import SaleDetailsReport from './components/SaleDetailsReport/SaleDetailsReport';
import { getSalesFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

const { Text } = Typography;

const SalesReports: React.FC<any> = () => {
  const { t } = useTranslation();
  const [salesReports, setSalesReport] = useState<ISalesReport[]>([]);
  const [checkedSalesReport, setCheckedSalesReport] = useState<ISalesReport | null>(null);
  const [salesReportDetails, setSalesReportDetails] = useState<ISalesReportsDetails | null>(null);
  const [ordersFiltersOptions, setOrdersFiltersOptions] = useState<IOrderFilterValues | null>(null);
  const [filtersValues, setFiltersValues] = useState({
    FromDate: moment().format('DD-MM-YYYY'),
    ToDate: moment().format('DD-MM-YYYY')
  });
  const [totalRecords, setTotalRecords] = useState<{
    TotalAmountAfterTranDiscount: number;
    TotalRecords: number;
  }>({
    TotalAmountAfterTranDiscount: 0,
    TotalRecords: 0
  });

  const getSaleReports = (filters: any) => {
    API.reports.getSalesReports(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setSalesReport(res.List);
        setTotalRecords({
          TotalRecords: res.TotalRecords,
          TotalAmountAfterTranDiscount: res.TotalAmountAfterTranDiscount
        });
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

  const getTabletSummary = () => {
    return (
      <Table.Summary fixed="bottom">
        <Table.Summary.Row>
          <Table.Summary.Cell
            index={0}
            colSpan={3}
          >
            <Text strong>
              {t('TotalAmountAfterTranDiscount')}: {totalRecords.TotalAmountAfterTranDiscount}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell
            index={1}
            colSpan={3}
          >
            <Text strong>
              {t('TotalRecords')}: {totalRecords.TotalRecords}
            </Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
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
          summary={getTabletSummary}
        />
      </div>
      <Modal
        className="modalStyle"
        width={1200}
        title={t('reports.saleReports.salesReportDetails.salesReportDetailsTitle')}
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
