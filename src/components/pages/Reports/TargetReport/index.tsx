import React, { useEffect, useRef, useState } from 'react';
import { Button, Table, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../server';
import { ITargetReport, ITargetReportDetails, RESPONSE_STATUSES } from '../../../../server/models';
import CustomTable from '../../Dashboard/CustomTable';
import Filters from '../../../filters/FIlters';
import TargetReportDetails from './TargetReportDetails';
import { getSaleReportsTableColumns } from './columns';
import { getSalesFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import './styles.scss';
const { Text } = Typography;

interface BranchViewDetailsRecord {
  data: ITargetReportDetails[];
  isUpdatedData: boolean;
}

const TargetReport: React.FC<any> = () => {
  const { t } = useTranslation();
  const [branchVIewList, setBranchViewList] = useState<ITargetReport[]>([]);
  const [branchVIewListDetails, setBranchViewListDetails] = useState<Record<string, BranchViewDetailsRecord>>({});
  const [filtersValues, setFiltersValues] = useState({ SelectedMonth: moment().format('MM/yyyy') });

  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    // @ts-ignore
    setTableHeight(node?.clientHeight - 150);
  }, [ref]);

  const getTargetReports = (filters: any) => {
    API.reports.ticketReports.getTargetReports(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setBranchViewList(res.List);
      }
    });
  };

  const expandedRowRender = (record: ITargetReport) => {
    return <TargetReportDetails data={branchVIewListDetails[record.SellerCode]?.data || []} />;
  };

  const onExpand = (expanded: boolean, record: ITargetReport) => {
    const currentDetails = branchVIewListDetails[record.SellerCode];
    const isUpdatedData = currentDetails?.isUpdatedData;

    if (Object.keys(filtersValues).length && expanded && (!currentDetails || (currentDetails && !isUpdatedData))) {
      const data = { ...filtersValues, ...{ SellerCode: record.SellerCode } };
      API.reports.ticketReports.getSellerTargetReportDetails(data).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          const newDetails: BranchViewDetailsRecord = {
            data: res.List,
            isUpdatedData: true
          };
          const copyDetailsData = { ...branchVIewListDetails };
          copyDetailsData[record.SellerCode] = newDetails;
          setBranchViewListDetails(copyDetailsData);
        }
      });
    }
  };

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      const copyDetailsData = { ...branchVIewListDetails };
      // @ts-ignore
      Object.keys(copyDetailsData).forEach((id: number) => {
        copyDetailsData[id].isUpdatedData = false;
      });
      getTargetReports(filtersValues);
    }
  }, [filtersValues]);

  const getTabletSummary = (pageData: ITargetReport[]) => {
    let totalOrders = 0;
    let totalTickets = 0;
    pageData.forEach((rec) => {
      totalOrders += rec.TotalOrders;
      // totalTickets += rec.TotalTickets;
    });
    const ticketsPerOrderTotal = totalTickets && totalOrders ? (totalTickets / totalOrders).toFixed(2) : 0;
    return (
      <Table.Summary fixed="bottom">
        <Table.Summary.Row>
          <Table.Summary.Cell
            index={0}
            colSpan={2}
          />
          <Table.Summary.Cell
            colSpan={1}
            index={1}
          >
            <Text strong>{totalOrders}</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell
            index={2}
            colSpan={1}
          >
            <Text strong>{totalTickets}</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell
            index={3}
            colSpan={1}
          >
            <Text strong>{`${ticketsPerOrderTotal}%`}</Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };

  return (
    <div className="flex-1 branchViewWrapper">
      <Filters
        filters={getSalesFilters()}
        onChange={setFiltersValues}
        filtersValues={filtersValues}
      />
      <div
        className="relative flex-1"
        ref={ref}
      >
        <Button
          icon={<ReloadOutlined />}
          onClick={() => getTargetReports(filtersValues)}
          type="primary"
          className="userDailyStatsBtn"
        />
        <CustomTable
          data={branchVIewList}
          columns={getSaleReportsTableColumns(t)}
          expandRowByClick
          expandable={{ expandedRowRender, onExpand }}
          scrollSize={tableHeight}
          // @ts-ignore
          // summary={getTabletSummary}
        />
      </div>
    </div>
  );
};

export default TargetReport;
