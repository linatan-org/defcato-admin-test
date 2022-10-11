import moment from 'moment';
import { UseTranslationResponse } from 'react-i18next';
import { IZReportParams } from '../../../../server/models';

export const getZReportsTableColumns = (t: any): any => [
  {
    title: t('reports.ZReports.ZReport'),
    children: [
      {
        title: t('reports.ZReports.Branch'),
        dataIndex: 'BranchName',
        key: 'BranchName'
      },
      {
        title: t('reports.ZReports.Station'),
        dataIndex: 'Description',
        key: 'Description'
      },
      {
        title: t('reports.ZReports.Date'),
        dataIndex: 'ReportParams',
        key: 'ReportParams',
        render: (v: IZReportParams) => v.ReportDate && moment(v.ReportDate).format('DD/MM/yyyy')
      },
      {
        title: t('reports.ZReports.Refunds'),
        dataIndex: 'ReportParams',
        key: 'ReportParams.TotalRefunds',
        render: (v: IZReportParams) => v.TotalRefunds
      },
      {
        title: t('reports.ZReports.Balance'),
        dataIndex: 'ReportParams',
        key: 'ReportParams',
        render: (v: IZReportParams) => v.Balance
      },
      {
        title: t('reports.ZReports.TotalCash'),
        dataIndex: 'ReportParams',
        key: 'ReportParams',
        render: (v: IZReportParams) => v.TotalCash
      },
      {
        title: t('reports.ZReports.Vat'),
        dataIndex: 'ReportParams',
        key: 'ReportParams',
        render: (v: IZReportParams) => v.Vat
      },
      {
        title: t('reports.ZReports.Status'),
        dataIndex: 'ZStatus',
        key: 'ZStatus'
      }
    ]
  }
];
