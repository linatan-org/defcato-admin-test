import { Table } from 'antd';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import './table.style.scss';

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
for (let i = 0; i < 4; i++) {
  data.push({
    key: i,
    name: 'Moshe',
    ordersConversion: '10%',
    hourRedemption: '434',
    totalOrders: '4'
  });
}

interface DataTableProps {
  setActiveUserIxd: (idx: number) => void;
}

const DashboardTable: React.FC<DataTableProps> = ({ setActiveUserIxd }) => {
  const [activeClass, setActiveClass] = useState(0);
  const addActiveClassRow = (number: number) => {
    setActiveUserIxd(number);
    setActiveClass(number);
  };
  return (
    <Table
      rowClassName={(_, index) =>
        index === activeClass ? 'ant-table-row-active' : ''
      }
      columns={columns}
      dataSource={data}
      bordered
      size="middle"
      pagination={false}
      onRow={(_, rowIndex: any) => {
        return {
          onClick: () => {
            addActiveClassRow(rowIndex);
          }
        };
      }}
    />
  );
};

export default DashboardTable;
