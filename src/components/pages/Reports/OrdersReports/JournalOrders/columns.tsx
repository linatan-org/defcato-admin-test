import moment from 'moment';
import { ISalesReport } from '../../../../../server/models';
import { EyeFilled } from '@ant-design/icons';

export const getColumns = (t: any, onOpenReportDetails: (r: ISalesReport) => void): any => [
  {
    title: t('reports.ordersReports.OrdersJournal'),
    children: [
      {
        title: t('reports.ordersReports.JournalReports.columns.BranchNetCode'),
        width: 100,
        dataIndex: 'BranchNetCode',
        key: 'BranchNetCode'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.CreatedDate'),
        width: 100,
        dataIndex: 'CreatedDate',
        key: 'CreatedDate',
        render: (v: string) => moment(v).format('DD-MM-YYYY')
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.PrintedDate'),
        width: 100,
        dataIndex: 'PrintedDate',
        key: 'PrintedDate',
        render: (v: string) => moment(v).format('DD-MM-YYYY')
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.OrderNumber'),
        width: 100,
        dataIndex: 'OrderNumber',
        key: 'OrderNumber'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.CardNumber'),
        width: 100,
        dataIndex: 'CardNumber',
        key: 'CardNumber'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.MemberName'),
        width: 100,
        dataIndex: 'MemberName',
        key: 'MemberName'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.DeliveryRecipientName'),
        width: 100,
        dataIndex: 'DeliveryRecipientName',
        key: 'DeliveryRecipientName'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.OrderAddress'),
        width: 100,
        dataIndex: 'OrderAddress',
        key: 'OrderAddress'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.SellerName'),
        width: 100,
        dataIndex: 'SellerName',
        key: 'SellerName'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.ItemsTotal'),
        width: 100,
        dataIndex: 'ItemsTotal',
        key: 'ItemsTotal'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.DiscountTotal'),
        width: 100,
        dataIndex: 'DiscountTotal',
        key: 'DiscountTotal'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.DiscountPercent'),
        width: 100,
        dataIndex: 'DiscountPercent',
        key: 'DiscountPercent'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.TotalBeforeVat'),
        width: 100,
        dataIndex: 'TotalBeforeVat',
        key: 'TotalBeforeVat'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.TotalAfterVat'),
        width: 100,
        dataIndex: 'TotalAfterVat',
        key: 'TotalAfterVat'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.StatusDescription'),
        width: 100,
        dataIndex: 'StatusDescription',
        key: 'StatusDescription'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.DeliveryDate'),
        width: 100,
        dataIndex: 'DeliveryDate',
        key: 'DeliveryDate',
        render: (v: string) => moment(v).format('DD-MM-YYYY')
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.SuppliedDate'),
        width: 100,
        dataIndex: 'SuppliedDate',
        key: 'SuppliedDate',
        render: (v: string) => moment(v).format('DD-MM-YYYY')
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.SuppliedHour'),
        width: 100,
        dataIndex: 'SuppliedHour',
        key: 'SuppliedHour'
      },
      {
        title: t('reports.ordersReports.JournalReports.columns.CancelReason'),
        width: 100,
        dataIndex: 'CancelReason',
        key: 'CancelReason'
      },
      {
        title: '',
        dataIndex: 'icons',
        key: 'icons',
        width: 50,
        render: (a: any, r: ISalesReport) => (
          <div>
            <EyeFilled
              className="text-lg rtl:mr-4 ltr:ml-4"
              onClick={() => onOpenReportDetails(r)}
            />
          </div>
        )
      }
    ]
  }
];
