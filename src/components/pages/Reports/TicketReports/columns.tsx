import moment from 'moment';
import { UseTranslationResponse } from 'react-i18next';

export const getSaleReportsTableColumns = (t: any): any => [
  {
    title: t('reports.saleReports.salesReports'),
    children: [
      {
        title: t('reports.saleReports.deviceTranReference'),
        dataIndex: 'DeviceTranRference',
        key: 'DeviceTranRference'
      },
      {
        title: t('reports.saleReports.tranType'),
        dataIndex: 'TranType',
        key: 'TranType'
      },
      {
        title: t('reports.saleReports.tranDate'),
        dataIndex: 'TranDate',
        key: 'TranDate',
        render: (v: string) => moment(v).format('DD/MM/yyyy')
      },
      {
        title: t('reports.saleReports.operatorNumber'),
        dataIndex: 'OperatorNumber',
        key: 'OperatorNumber'
      },
      {
        title: t('reports.saleReports.sellerNumber'),
        dataIndex: 'SellerNumber',
        key: 'SellerNumber'
      },
      {
        title: t('reports.saleReports.branchName'),
        dataIndex: 'BranchName',
        key: 'BranchName'
      },
      {
        title: t('reports.saleReports.memberName'),
        dataIndex: 'MemberName',
        key: 'MemberName'
      },
      {
        title: t('reports.saleReports.totalAmount'),
        dataIndex: 'TotalAmount',
        key: 'TotalAmount'
      }
    ]
  }
];
