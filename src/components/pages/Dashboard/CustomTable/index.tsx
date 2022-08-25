import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';
import React, { PropsWithChildren, useState } from 'react';
import './table.style.scss';
import { IDailyUserStatsData, IDataTable } from '../../../../server/models';
import { getDashboardTableValues } from '../values';

interface DataTableProps<T> {
  setActiveUserIxd?: (idx: number) => void;
  data: T[];
  checkedUserDeviceSysId?: number;
  columns: ColumnsType<T>;
  activeKey?: string;
}

const CustomTable = <T,>(props: PropsWithChildren<DataTableProps<T>>) => {
  const { t } = useTranslation();
  // const columns: ColumnsType<IDailyUserStatsData> = getDashboardTableValues(t);
  const addActiveClassRow = (number: any) => {
    props.setActiveUserIxd && props.setActiveUserIxd(number);
  };
  return (
    <div>
      <Table
        rowClassName={(value) =>
          props.activeKey && (value as any)[props.activeKey] === props.checkedUserDeviceSysId ? 'ant-table-row-active' : ''
        }
        // @ts-ignore
        columns={props.columns}
        dataSource={props.data.map((v, index) => ({ ...v, key: index }))}
        bordered
        size="middle"
        pagination={false}
        scroll={{ y: 600 }}
        onRow={(value) => {
          return {
            onClick: () => {
              props.activeKey && addActiveClassRow((value as any)[props.activeKey]);
            }
          };
        }}
      />
    </div>
  );
};

export default CustomTable;
