import { Table } from 'antd';
import { TableProps } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';
import React, { PropsWithChildren } from 'react';
import './table.style.scss';

interface DataTableProps<T> extends TableProps<T> {
  setActiveUserIxd?: (idx: string) => void;
  data: T[];
  checkedUserDeviceSysId?: string;
  columns: ColumnsType<T>;
  activeKey?: string;
  scrollSize?: number;
  onDoubleClick?: (item: T) => void;
  colorMap?: Record<string, string>;
  colorMapKey?: string;
}

const CustomTable = <T,>(props: PropsWithChildren<DataTableProps<T>>) => {
  const { t } = useTranslation();
  const { colorMap, colorMapKey } = props;
  // const columns: ColumnsType<IDailyUserStatsData> = getDashboardTableValues(t);
  const addActiveClassRow = (number: any) => {
    props.setActiveUserIxd && props.setActiveUserIxd(number);
  };
  return (
    <div>
      <Table
        {...props}
        rowClassName={(item: any) => {
          const checked = props.activeKey && (item as any)[props.activeKey] === props.checkedUserDeviceSysId;
          if (colorMap && colorMapKey && !checked) {
            const value = item[colorMapKey]?.toString();
            console.log(colorMap, colorMapKey, 'colorMapKeycolorMapKeycolorMapKey', item);
            return colorMap[value];
          }
          return checked ? 'ant-table-row-active' : '';
        }}
        // @ts-ignore
        columns={props.columns}
        dataSource={props.data.map((v, index) => ({ ...v, key: index }))}
        bordered
        virtual
        size="middle"
        pagination={false}
        scroll={{ y: props.scrollSize || 600 }}
        onRow={(value) => {
          if (props.onDoubleClick) {
            return {
              onDoubleClick: () => {
                props.onDoubleClick && props.onDoubleClick(value as any);
              }
            };
          }
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
