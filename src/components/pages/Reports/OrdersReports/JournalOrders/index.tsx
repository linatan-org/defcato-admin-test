import { FileExcelFilled } from '@ant-design/icons/lib';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Modal, Table, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { getOrderedTableColumns } from '../../../../../helpers/helpers';
import { API } from '../../../../../server';
import {
  FieldsViewMap,
  IOrderFilterValues,
  IOrderReport,
  ISalesReport,
  OrdersReportsEnum,
  RESPONSE_STATUSES
} from '../../../../../server/models';
import CustomTable from '../../../Dashboard/CustomTable';
import Filters from '../../../../filters/FIlters';
import { getColumns } from './columns';
import { getAdditionalFilters, getFilters } from './filters';
import { EyeFilled, ReloadOutlined } from '@ant-design/icons';
import './styles.scss';
import SaleDetailsReport from '../../SalesReports/components/SaleDetailsReport/SaleDetailsReport';

const { Text } = Typography;

interface Interface {
  ordersFiltersOptions: IOrderFilterValues | null;
}

const JournalOrders: React.FC<Interface> = ({ ordersFiltersOptions }) => {
  const { t } = useTranslation();
  const [ordersList, setOredersList] = useState<IOrderReport[]>([]);
  const [filtersValues, setFiltersValues] = useState<any>({});
  const [checkedJournalReport, setCheckedJournalReport] = useState<any>(null);
  const [checkedJournalReportDetails, setCheckedJournalReportDetails] = useState<any>(null);
  const [totalRecords, setTotalRecords] = useState<{ TotalRecords: number; TotalAfterVat: number; TotalBeforeVat: number }>({
    TotalRecords: 0,
    TotalAfterVat: 0,
    TotalBeforeVat: 0
  });
  const detailsColumn = {
    title: '',
    dataIndex: 'icons',
    key: 'icons',
    width: 50,
    render: (a: any, r: ISalesReport) => (
      <div>
        <EyeFilled
          className="text-lg rtl:mr-4 ltr:ml-4"
          onClick={() => setCheckedJournalReport(r)}
        />
      </div>
    )
  };
  const [fieldsOrder, setFieldsOrder] = useState<FieldsViewMap[]>([]);

  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    // @ts-ignore
    // setTableHeight(node?.clientHeight - 150);
  }, [ref]);

  useEffect(() => {
    if (checkedJournalReport) {
      API.reports.getSalesReportDetails(checkedJournalReport).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK && res.Transaction) {
          setCheckedJournalReportDetails(res.Transaction);
        }
      });
    } else {
      setCheckedJournalReportDetails(null);
    }
  }, [checkedJournalReport]);

  const getJournalList = (filters: any) => {
    API.reports.orderReports.getOrdersReport(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setFieldsOrder(res.FieldsViewMap);
        setTotalRecords({
          TotalRecords: res.TotalRecords,
          TotalAfterVat: res.TotalAfterVat,
          TotalBeforeVat: res.TotalBeforeVat
        });
        setOredersList(res.Orders);
      }
    });
  };

  const onSearch = () => {
    getJournalList(filtersValues);
  };

  const onExportToExcel = (filters: any) => {
    API.reports.orderReports.exportOrdersToExcel(filters, OrdersReportsEnum.ORDERS_JOURNAL).then((res) => {
      console.log(res);
      if (res.ErrorCode === RESPONSE_STATUSES.OK && res.ReportURL) {
        window.open(res.ReportURL, '_blank');
      }
    });
  };

  const modalActionButtons = useCallback(() => {
    return [
      <div
        key="wrapper"
        className="actions-button-wrapper"
      >
        <Button
          type="primary"
          className="w-36 h-12"
          key={t('reports.ZReports.ZReportDetails.Exit')}
          onClick={() => setCheckedJournalReportDetails(null)}
        >
          {t('reports.ZReports.ZReportDetails.Exit')}
        </Button>
      </div>
    ];
  }, []);

  const getTabletSummary = () => {
    return (
      <Table.Summary fixed="bottom">
        <Table.Summary.Row>
          <Table.Summary.Cell
            index={0}
            colSpan={3}
          >
            <Text strong>
              {t('TotalRecords')}: {totalRecords.TotalRecords}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell
            index={1}
            colSpan={3}
          >
            <Text strong>
              {t('TotalBeforeVat')}: {totalRecords.TotalBeforeVat}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell
            index={2}
            colSpan={3}
          >
            <Text strong>
              {t('TotalAfterVat')}: {totalRecords.TotalAfterVat}
            </Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };

  return (
    <div className="flex-1 branchViewWrapper">
      <Filters
        filters={getFilters(ordersFiltersOptions, t)}
        additionalFilters={getAdditionalFilters(ordersFiltersOptions, t)}
        onChange={setFiltersValues}
        filtersValues={filtersValues}
        onSearch={onSearch}
      />
      <div
        className="relative flex-1"
        ref={ref}
      >
        <Button
          icon={<FileExcelFilled />}
          onClick={() => onExportToExcel(filtersValues)}
          type="primary"
          className="exportToExcelBtn"
          disabled={ordersList.length === 0}
        >
          {t('exportToExcel')}
        </Button>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => getJournalList(filtersValues)}
          type="primary"
          className="userDailyStatsBtn"
        />
        <CustomTable
          data={ordersList}
          columns={
            fieldsOrder.length
              ? getOrderedTableColumns(t('reports.ordersReports.OrdersJournal'), fieldsOrder, t, [detailsColumn])
              : getColumns(t, setCheckedJournalReport)
          }
          expandRowByClick
          scrollSize={tableHeight}
          // @ts-ignore
          summary={getTabletSummary}
        />
      </div>
      {checkedJournalReportDetails && (
        <Modal
          className="modalStyle"
          width={1200}
          title={t('reports.saleReports.salesReportDetails.salesReportDetailsTitle')}
          visible={!!checkedJournalReportDetails}
          onOk={() => {}}
          onCancel={() => setCheckedJournalReportDetails(null)}
          footer={modalActionButtons()}
        >
          {checkedJournalReportDetails ? <SaleDetailsReport saleReport={checkedJournalReportDetails} /> : null}
        </Modal>
      )}
    </div>
  );
};

export default JournalOrders;
