import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, Table, Layout } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../../server';
import { ITicketReportJournal, RESPONSE_STATUSES } from '../../../../../server/models';
import CustomTable from '../../../Dashboard/CustomTable';
import Filters from '../../../../filters/FIlters';
import { getSaleReportsTableColumns } from './columns';
import { getSalesFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

const JournalView: React.FC<any> = () => {
  const { t } = useTranslation();
  const [journalList, setJournalList] = useState<ITicketReportJournal[]>([]);
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

  const getJournalList = (filters: any) => {
    API.reports.ticketReports.getJournals({ DateFilterId: 1 }).then((res) => {
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
  return (
    <div className="flex-1 branchViewWrapper">
      {/*<Filters*/}
      {/*filters={getSalesFilters()}*/}
      {/*onChange={setFiltersValues}*/}
      {/*filtersValues={filtersValues}*/}
      {/*/>*/}
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
                    {`${t('reports.ticketReports.TotalTicketsNumber')}: ${pageData.length}`}
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
