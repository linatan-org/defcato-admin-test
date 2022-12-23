import { FileExcelFilled } from '@ant-design/icons/lib';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Table, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../../server';
import { ITicketFilters, ITicketReportJournal, RESPONSE_STATUSES } from '../../../../../server/models';
import CustomTable from '../../../Dashboard/CustomTable';
import Filters from '../../../../filters/FIlters';
import { getSaleReportsTableColumns } from './columns';
import { getFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';
const { Text } = Typography;

const JournalView: React.FC<any> = () => {
  const { t } = useTranslation();
  const [journalList, setJournalList] = useState<ITicketReportJournal[]>([]);
  const [filtersOptions, setFiltersOptions] = useState<ITicketFilters | null>(null);
  const [filtersValues, setFiltersValues] = useState<any>({
    FromDate: moment().format('DD/MM/yyyy'),
    ToDate: moment().format('DD/MM/yyyy'),
    OpenDateRange: 0
  });

  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    // @ts-ignore
    setTableHeight(node?.clientHeight - 150);
  }, [ref]);

  const getJournalList = (filters: any) => {
    API.reports.ticketReports.getJournals(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setJournalList(res.Tickets);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(filtersValues).length) {
      getJournalList(filtersValues);
    }
  }, [filtersValues]);

  useEffect(() => {
    let filters;
    if (Object.keys(filtersValues).length) {
      filters = { ...filtersValues };
    }
    API.reports.ticketReports.getTicketsFilters(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setFiltersOptions(res);
      }
    });
  }, []);

  const onFiltersChange = (newFiltersValue: any) => {
    const copyFilters = { ...newFiltersValue };
    const oldOpenDateRange = filtersValues['OpenDateRange'];
    const newOpenDateRange = newFiltersValue['OpenDateRange'];
    if (copyFilters['OpenDateRange'] !== 0) {
      delete copyFilters['FromDate'];
      delete copyFilters['ToDate'];
    } else if (oldOpenDateRange !== 0 && newOpenDateRange === 0) {
      copyFilters['FromDate'] = moment().format('DD/MM/yyyy');
      copyFilters['ToDate'] = moment().format('DD/MM/yyyy');
    }
    setFiltersValues(copyFilters);
  };

  const onExportToExcel = (filters: any) => {
    API.reports.ticketReports.exportTicketsToExcel(filters).then((res) => {
      console.log(res);
      if (res.ErrorCode === RESPONSE_STATUSES.OK && res.ReportURL) {
        window.open(res.ReportURL, '_blank');
      }
    });
  };

  return (
    <div className="flex-1 branchViewWrapper">
      <Filters
        filters={getFilters(filtersOptions, t, filtersValues['OpenDateRange'] !== 0)}
        onChange={onFiltersChange}
        filtersValues={filtersValues}
      />
      <div
        className="relative flex-1"
        ref={ref}
      >
        <Button
          icon={<ReloadOutlined />}
          onClick={() => getJournalList(filtersValues)}
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
          data={journalList}
          columns={getSaleReportsTableColumns(t)}
          expandRowByClick
          scrollSize={tableHeight}
          summary={(pageData) => {
            return (
              <Table.Summary fixed="bottom">
                <Table.Summary.Row>
                  <Table.Summary.Cell
                    colSpan={10}
                    index={1}
                  >
                    <Text strong>{`${t('reports.ticketReports.TotalTicketsNumber')}: ${pageData.length}`}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </div>
    </div>
  );
};

export default JournalView;
