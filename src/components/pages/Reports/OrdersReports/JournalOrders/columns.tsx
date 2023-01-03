import moment from 'moment';
import { UseTranslationResponse } from 'react-i18next';

export const getColumns = (t: any): any => [
  {
    title: t('reports.saleReports.salesReports'),
    children: [
      {
        title: t('reports.ordersReports.columns.BranchNetCode'),
        width: 100,
        dataIndex: 'BranchNetCode',
        key: 'BranchNetCode'
      },
      {
        title: t('reports.ordersReports.columns.CreatedDate'),
        width: 100,
        dataIndex: 'CreatedDate',
        key: 'CreatedDate',
        render: (v: string) => moment(v).format('DD/MM/yyyy')
      },
      {
        title: t('reports.ordersReports.columns.PrintedDate'),
        width: 100,
        dataIndex: 'PrintedDate',
        key: 'PrintedDate',
        render: (v: string) => moment(v).format('DD/MM/yyyy')
      },
      {
        title: t('reports.ordersReports.columns.OrderNumber'),
        width: 100,
        dataIndex: 'OrderNumber',
        key: 'OrderNumber'
      },
      {
        title: t('reports.ordersReports.columns.CardNumber'),
        width: 100,
        dataIndex: 'CardNumber',
        key: 'CardNumber'
      },
      {
        title: t('reports.ordersReports.columns.MemberName'),
        width: 100,
        dataIndex: 'MemberName',
        key: 'MemberName'
      },
      {
        title: t('reports.ordersReports.columns.DeliveryRecipientName'),
        width: 100,
        dataIndex: 'DeliveryRecipientName',
        key: 'DeliveryRecipientName'
      },
      {
        title: t('reports.ordersReports.columns.OrderAddress'),
        width: 100,
        dataIndex: 'OrderAddress',
        key: 'OrderAddress'
      },
      {
        title: t('reports.ordersReports.columns.SellerName'),
        width: 100,
        dataIndex: 'SellerName',
        key: 'SellerName'
      },
      {
        title: t('reports.ordersReports.columns.ItemsTotal'),
        width: 100,
        dataIndex: 'ItemsTotal',
        key: 'ItemsTotal'
      },
      {
        title: t('reports.ordersReports.columns.DiscountTotal'),
        width: 100,
        dataIndex: 'DiscountTotal',
        key: 'DiscountTotal'
      },
      {
        title: t('reports.ordersReports.columns.DiscountPercent'),
        width: 100,
        dataIndex: 'DiscountPercent',
        key: 'DiscountPercent'
      },
      {
        title: t('reports.ordersReports.columns.TotalBeforeVat'),
        width: 100,
        dataIndex: 'TotalBeforeVat',
        key: 'TotalBeforeVat'
      },
      {
        title: t('reports.ordersReports.columns.TotalAfterVat'),
        width: 100,
        dataIndex: 'TotalAfterVat',
        key: 'TotalAfterVat'
      },
      {
        title: t('reports.ordersReports.columns.StatusDescription'),
        width: 100,
        dataIndex: 'StatusDescription',
        key: 'StatusDescription'
      },
      {
        title: t('reports.ordersReports.columns.DeliveryDate'),
        width: 100,
        dataIndex: 'DeliveryDate',
        key: 'DeliveryDate',
        render: (v: string) => moment(v).format('DD/MM/yyyy')
      },
      {
        title: t('reports.ordersReports.columns.SuppliedDate'),
        width: 100,
        dataIndex: 'SuppliedDate',
        key: 'SuppliedDate',
        render: (v: string) => moment(v).format('DD/MM/yyyy')
      },
      {
        title: t('reports.ordersReports.columns.SuppliedHour'),
        width: 100,
        dataIndex: 'SuppliedHour',
        key: 'SuppliedHour'
      },
      {
        title: t('reports.ordersReports.columns.CancelReason'),
        width: 100,
        dataIndex: 'CancelReason',
        key: 'CancelReason'
      }
    ]
  }
];
