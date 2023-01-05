import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { API } from '../../../../../server';
import { IItemsTotalReports, IOrderFilterValues, RESPONSE_STATUSES } from '../../../../../server/models';
import CustomTable from '../../../Dashboard/CustomTable';
import Filters from '../../../../filters/FIlters';
import { getColumns } from './columns';
import { getFilters } from './filters';
import { ReloadOutlined } from '@ant-design/icons';
import './styles.scss';

interface Interface {
  ordersFiltersOptions: IOrderFilterValues | null;
}

const ItemsTotalReport: React.FC<Interface> = ({ ordersFiltersOptions }) => {
  const { t } = useTranslation();
  const [itemsTotalList, setItemsTotalList] = useState<IItemsTotalReports[]>([]);
  const [filtersValues, setFiltersValues] = useState<any>({});

  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    console.log(node?.clientHeight, 'node?.clientHeight');
    // @ts-ignore
    // setTableHeight(node?.clientHeight - 150);
  }, [ref?.current?.clientHeight]);

  const getJournalList = (filters: any) => {
    API.reports.orderReports.getItemsTotalReport(filters).then((res) => {
      if (res.ErrorCode === RESPONSE_STATUSES.OK) {
        setItemsTotalList(res.List);
      }
    });
  };

  const onSearch = () => {
    getJournalList(filtersValues);
  };

  return (
    <div className="flex-1 branchViewWrapper">
      <Filters
        filters={getFilters(ordersFiltersOptions, t)}
        onChange={setFiltersValues}
        filtersValues={filtersValues}
        onSearch={onSearch}
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
        <CustomTable
          data={itemsTotalList}
          columns={getColumns(t)}
          expandRowByClick
          scrollSize={tableHeight}
        />
      </div>
    </div>
  );
};

export default ItemsTotalReport;
