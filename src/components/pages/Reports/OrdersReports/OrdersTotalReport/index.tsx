import { FileExcelFilled } from '@ant-design/icons/lib';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Table, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { getOrderedTableColumns } from '../../../../../helpers/helpers';
import { API } from '../../../../../server';
import {
  FieldsViewMap,
  IOrderFilterValues,
  ITotalOrderReport,
  ITotalOrderReportList,
  OrdersReportsEnum,
  RESPONSE_STATUSES
} from '../../../../../server/models';
import CustomTable from '../../../Dashboard/CustomTable';
import Filters from '../../../../filters/FIlters';
import { getColumns } from './columns';
import { getAdditionalFilters, getFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

const { Text } = Typography;

interface Interface {
  ordersFiltersOptions: IOrderFilterValues | null;
}

const OrdersTotalReport: React.FC<Interface> = ({ ordersFiltersOptions }) => {
  const { t } = useTranslation();
  const [totalOrdersList, setTotalOrdersList] = useState<ITotalOrderReport[]>([]);
  const [filtersValues, setFiltersValues] = useState<any>({});
  const [totalRecords, setTotalRecords] = useState<{
    TotalItems: number;
    TotalAfterVat: number;
    TotalBeforeVat: number;
    OrderAVG: number;
    TotalRecords: number;
  }>({
    TotalItems: 0,
    TotalAfterVat: 0,
    TotalBeforeVat: 0,
    OrderAVG: 0,
    TotalRecords: 0
  });
  const [fieldsOrder, setFieldsOrder] = useState<FieldsViewMap[]>([]);

  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    console.log(node?.clientHeight, 'node?.clientHeight');
    // @ts-ignore
    // setTableHeight(node?.clientHeight - 150);
  }, [ref?.current?.clientHeight]);

  const getJournalList = (filters: any) => {
    API.reports.orderReports.getTotalOrdersReport(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setTotalRecords({
          TotalItems: res.TotalItems,
          TotalAfterVat: res.TotalAfterVat,
          TotalBeforeVat: res.TotalBeforeVat,
          OrderAVG: res.OrderAVG,
          TotalRecords: res.TotalRecords
        });
        setFieldsOrder(res.FieldsViewMap);
        setTotalOrdersList(res.List);
      }
    });
  };

  const onSearch = () => {
    getJournalList(filtersValues);
  };

  const onExportToExcel = (filters: any) => {
    API.reports.orderReports.exportOrdersToExcel(filters, OrdersReportsEnum.ORDERS_BY_PROPERTIES).then((res) => {
      console.log(res);
      if (res.ErrorCode === RESPONSE_STATUSES.OK && res.ReportURL) {
        window.open(res.ReportURL, '_blank');
      }
    });
  };

  const getTabletSummary = (pageData: ITotalOrderReportList[]) => {
    return (
      <Table.Summary fixed="bottom">
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>
            <Text strong>
              {t('TotalRecords')}: {totalRecords.TotalRecords}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={0}>
            <Text strong>
              {t('TotalItems')}: {totalRecords.TotalItems}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            <Text strong>
              {t('TotalBeforeVat')}: {totalRecords.TotalBeforeVat}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2}>
            <Text strong>
              {t('TotalAfterVat')}: {totalRecords.TotalAfterVat}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={3}>
            <Text strong>
              {t('OrderAVG')}: {totalRecords.OrderAVG}
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
          disabled={totalOrdersList.length === 0}
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
          // @ts-ignore
          data={totalOrdersList}
          columns={
            fieldsOrder.length
              ? getOrderedTableColumns(t('reports.ordersReports.OrdersByProperties'), fieldsOrder, t)
              : getColumns(t)
          }
          expandRowByClick
          scrollSize={tableHeight}
          // @ts-ignore
          summary={getTabletSummary}
        />
      </div>
    </div>
  );
};

export default OrdersTotalReport;
