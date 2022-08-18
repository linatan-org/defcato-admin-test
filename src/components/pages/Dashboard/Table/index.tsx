import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface DataType {
  key: React.Key;
  name: string;
  ordersConversion: string;
  hourRedemption: string;
  totalOrders: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'נציג מכירות',
    children: [
      {
        title: 'שם נציג',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'כמות הזמנות',
        dataIndex: 'totalOrders',
        key: 'totalOrders'
      },
      {
        title: 'פדיון שעתי',
        dataIndex: 'hourRedemption',
        key: 'hourRedemption'
      },
      {
        title: 'אחוז סגירה',
        dataIndex: 'ordersConversion',
        key: 'ordersConversion'
      }
    ]
  }
];

const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: 'Moshe',
    ordersConversion: '10%',
    hourRedemption: '434',
    totalOrders: '4'
  });
}

const DashboardTable: React.FC = () => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    size="middle"
  />
);

export default DashboardTable;
