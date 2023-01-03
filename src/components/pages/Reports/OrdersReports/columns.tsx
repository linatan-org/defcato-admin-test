import moment from 'moment';
import { UseTranslationResponse } from 'react-i18next';

export const getSaleReportsTableColumns = (t: any): any => [
  {
    title: t('reports.saleReports.salesReports'),
    children: [
      {
        title: t('reports.ordersReports.columns.BranchNetCode'),
        dataIndex: 'BranchNetCode',
        key: 'BranchNetCode'
      },
      {
        title: t('reports.ordersReports.columns.CreatedDate'),
        dataIndex: 'CreatedDate',
        key: 'CreatedDate',
        render: (v: string) => moment(v).format('DD/MM/yyyy')
      },
      {
        title: t('reports.ordersReports.columns.PrintedDate'),
        dataIndex: 'PrintedDate',
        key: 'PrintedDate',
        render: (v: string) => moment(v).format('DD/MM/yyyy')
      },
      {
        title: t('reports.ordersReports.columns.OrderNumber'),
        dataIndex: 'OrderNumber',
        key: 'OrderNumber'
      },
      {
        title: t('reports.ordersReports.columns.CardNumber'),
        dataIndex: 'CardNumber',
        key: 'CardNumber'
      },
      {
        title: t('reports.ordersReports.columns.MemberName'),
        dataIndex: 'MemberName',
        key: 'MemberName'
      },
      {
        title: t('reports.ordersReports.columns.DeliveryRecipientName'),
        dataIndex: 'DeliveryRecipientName',
        key: 'DeliveryRecipientName'
      },
      {
        title: t('reports.ordersReports.columns.OrderAddress'),
        dataIndex: 'OrderAddress',
        key: 'OrderAddress'
      },
      {
        title: t('reports.ordersReports.columns.SellerName'),
        dataIndex: 'SellerName',
        key: 'SellerName'
      },
      {
        title: t('reports.ordersReports.columns.ItemsTotal'),
        dataIndex: 'ItemsTotal',
        key: 'ItemsTotal'
      },
      {
        title: t('reports.ordersReports.columns.DiscountTotal'),
        dataIndex: 'DiscountTotal',
        key: 'DiscountTotal'
      },
      {
        title: t('reports.ordersReports.columns.DiscountPercent'),
        dataIndex: 'DiscountPercent',
        key: 'DiscountPercent'
      },
      {
        title: t('reports.ordersReports.columns.TotalBeforeVat'),
        dataIndex: 'TotalBeforeVat',
        key: 'TotalBeforeVat'
      },
      {
        title: t('reports.ordersReports.columns.TotalAfterVat'),
        dataIndex: 'TotalAfterVat',
        key: 'TotalAfterVat'
      },
      {
        title: t('reports.ordersReports.columns.StatusDescription'),
        dataIndex: 'StatusDescription',
        key: 'StatusDescription'
      },
      {
        title: t('reports.ordersReports.columns.DeliveryDate'),
        dataIndex: 'DeliveryDate',
        key: 'DeliveryDate',
        render: (v: string) => moment(v).format('DD/MM/yyyy')
      },
      {
        title: t('reports.ordersReports.columns.SuppliedDate'),
        dataIndex: 'SuppliedDate',
        key: 'SuppliedDate',
        render: (v: string) => moment(v).format('DD/MM/yyyy')
      },
      {
        title: t('reports.ordersReports.columns.SuppliedHour'),
        dataIndex: 'SuppliedHour',
        key: 'SuppliedHour'
      },
      {
        title: t('reports.ordersReports.columns.CancelReason'),
        dataIndex: 'CancelReason',
        key: 'CancelReason'
      }
    ]
  }
];
