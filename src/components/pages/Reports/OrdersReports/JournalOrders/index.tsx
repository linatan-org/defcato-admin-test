import { FileExcelFilled } from '@ant-design/icons/lib';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Table, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../../server';
import {
  FieldsViewMap,
  IOrderFilterValues,
  IOrderReport,
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

const JournalOrders: React.FC<Interface> = ({ ordersFiltersOptions }) => {
  const { t } = useTranslation();
  const [ordersList, setOredersList] = useState<IOrderReport[]>([]);
  const [filtersValues, setFiltersValues] = useState<any>({});
  const [totalRecords, setTotalRecords] = useState<{ TotalRecords: number; TotalAfterVat: number; TotalBeforeVat: number }>({
    TotalRecords: 0,
    TotalAfterVat: 0,
    TotalBeforeVat: 0
  });
  // eslint-disable-next-line no-undef
  const [fieldsOrder, setFieldsOrder] = useState<FieldsViewMap[]>([]);

  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    // @ts-ignore
    // setTableHeight(node?.clientHeight - 150);
  }, [ref]);

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

  const getTabletSummary = (pageData: IOrderReport[]) => {
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

export default JournalOrders;
