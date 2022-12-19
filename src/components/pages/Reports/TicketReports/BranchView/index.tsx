import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, Table, Layout, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../../server';
import { ITicketReportBranchView, ITicketReportBranchViewDetails, RESPONSE_STATUSES } from '../../../../../server/models';
import CustomTable from '../../../Dashboard/CustomTable';
import Filters from '../../../../filters/FIlters';
import BranchViewDetails from '../BranchViewDetails';
import { getSaleReportsTableColumns } from './columns';
import { getSalesFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';
const { Text } = Typography;

interface BranchViewDetailsRecord {
  data: ITicketReportBranchViewDetails[];
  isUpdatedData: boolean;
}

const BranchView: React.FC<any> = () => {
  const { t } = useTranslation();
  const [branchVIewList, setBranchViewList] = useState<ITicketReportBranchView[]>([]);
  const [branchVIewListDetails, setBranchViewListDetails] = useState<Record<number, BranchViewDetailsRecord>>({});
  const [filtersValues, setFiltersValues] = useState({
    FromDate: moment().format('DD/MM/yyyy'),
    ToDate: moment().format('DD/MM/yyyy')
  });

  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    // @ts-ignore
    setTableHeight(node?.clientHeight - 150);
  }, [ref]);

  const getBranchViewList = (filters: any) => {
    API.reports.ticketReports.getBranchTickets(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setBranchViewList(res.List);
      }
    });
  };

  const expandedRowRender = (record: ITicketReportBranchView) => {
    return <BranchViewDetails data={branchVIewListDetails[record.BranchSysId]?.data || []} />;
  };

  const onExpand = (expanded: boolean, record: ITicketReportBranchView) => {
    const currentDetails = branchVIewListDetails[record.BranchSysId];
    const isUpdatedData = currentDetails?.isUpdatedData;

    if (Object.keys(filtersValues).length && expanded && (!currentDetails || (currentDetails && !isUpdatedData))) {
      const data = { ...filtersValues, ...{ BranchSysId: record.BranchSysId } };
      API.reports.ticketReports.getBranchTicketsDetails(data).then((res) => {
        if (res.ErrorCode === RESPONSE_STATUSES.OK) {
          const newDetails: BranchViewDetailsRecord = {
            data: res.List,
            isUpdatedData: true
          };
          const copyDetailsData = { ...branchVIewListDetails };
          copyDetailsData[record.BranchSysId] = newDetails;
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
      getBranchViewList(filtersValues);
    }
  }, [filtersValues]);

  const getTabletSummary = (pageData: ITicketReportBranchView[]) => {
    let totalOrders = 0;
    let totalTickets = 0;
    pageData.forEach((rec) => {
      totalOrders += rec.TotalOrders;
      totalTickets += rec.TotalTickets;
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
          onClick={() => getBranchViewList(filtersValues)}
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
          summary={getTabletSummary}
        />
      </div>
    </div>
  );
};

export default BranchView;
