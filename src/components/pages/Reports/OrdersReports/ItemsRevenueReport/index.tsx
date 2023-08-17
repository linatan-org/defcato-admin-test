import { FileExcelFilled } from '@ant-design/icons/lib';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Table, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../../server';
import {
  IOrderFilterValues,
  IRevenueReport,
  ITotalOrderReportList,
  OrdersReportsEnum,
  RESPONSE_STATUSES
} from '../../../../../server/models';
import CustomTable from '../../../Dashboard/CustomTable';
import Filters from '../../../../filters/FIlters';
import { getAdditionalFilters } from '../ItemsTotalReport/filters';
import { getColumns } from './columns';
import { getFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

const { Text } = Typography;

interface Interface {
  ordersFiltersOptions: IOrderFilterValues | null;
}

const ItemsRevenueReport: React.FC<Interface> = ({ ordersFiltersOptions }) => {
  const { t } = useTranslation();
  const [revenueItems, setRevenueItems] = useState<IRevenueReport[]>([]);
  const [filtersValues, setFiltersValues] = useState<any>({});
  const [totalRecords, setTotalRecords] = useState<{
    TotalCost: number;
    TotalAfterVat: number;
    TotalBeforeVat: number;
    TotalRevenue: number;
    TotalRevenuePercent: number;
    TotalRecords: number;
  }>({
    TotalCost: 0,
    TotalAfterVat: 0,
    TotalBeforeVat: 0,
    TotalRevenuePercent: 0,
    TotalRevenue: 0,
    TotalRecords: 0
  });

  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    console.log(node?.clientHeight, 'node?.clientHeight');
    // @ts-ignore
    // setTableHeight(node?.clientHeight - 150);
  }, [ref?.current?.clientHeight]);

  const getJournalList = (filters: any) => {
    API.reports.orderReports.getItemsRevenueReport(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setRevenueItems(res.List);
        setTotalRecords({
          TotalRevenue: res.TotalRevenue,
          TotalAfterVat: res.TotalAfterVat,
          TotalBeforeVat: res.TotalBeforeVat,
          TotalCost: res.TotalCost,
          TotalRevenuePercent: res.TotalRevenuePercent,
          TotalRecords: res.TotalRecords
        });
      }
    });
  };

  const onSearch = () => {
    getJournalList(filtersValues);
  };

  const onExportToExcel = (filters: any) => {
    API.reports.orderReports.exportOrdersToExcel(filters, OrdersReportsEnum.ITEMS_REVENUE_REPORTS).then((res) => {
      console.log(res);
      if (res.ErrorCode === RESPONSE_STATUSES.OK && res.ReportURL) {
        window.open(res.ReportURL, '_blank');
      }
    });
  };

  const getTabletSummary = (pageData: IRevenueReport[]) => {
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
              {t('TotalCost')}: {totalRecords.TotalCost}
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
              {t('TotalRevenue')}: {totalRecords.TotalRevenue}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={3}>
            <Text strong>
              {t('TotalRevenuePercent')}: {totalRecords.TotalRevenuePercent}
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
          disabled={revenueItems.length === 0}
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
          data={revenueItems}
          columns={getColumns(t)}
          expandRowByClick
          scrollSize={tableHeight}
          // @ts-ignore
          summary={getTabletSummary}
        />
      </div>
    </div>
  );
};

export default ItemsRevenueReport;
