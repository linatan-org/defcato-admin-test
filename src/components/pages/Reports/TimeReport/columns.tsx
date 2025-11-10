import { ITImeReportShift, IZReportParams } from '../../../../server/models';
import moment from 'moment/moment';

export const getColumns = (t: any): any => [
  {
    title: t('reports.timeReport.title'),
    children: [
      {
        title: t('reports.timeReport.columns.Employee'),
        dataIndex: 'Name',
        key: 'Name'
      },
      {
        title: t('reports.timeReport.columns.TotalHours'),
        dataIndex: 'Total',
        key: 'Total'
      }
    ]
  }
];
export const getDetailsColumns = (t: any): any => [
  {
    title: t('reports.timeReport.title'),
    children: [
      {
        title: t('reports.timeReport.columns.Date'),
        dataIndex: 'ShiftDate',
        key: 'ShiftDate',
        render: (v: string) => v && moment(v).format('HH:mm DD-MM-YYYY')
      },
      {
        title: t('reports.timeReport.columns.EnterTime'),
        dataIndex: 'EnterTime',
        key: 'EnterTime',
        render: (v: string) => v && moment(v).format('HH:mm DD-MM-YYYY')
      },
      {
        title: t('reports.timeReport.columns.DepartureTime'),
        dataIndex: 'DepartureTime',
        key: 'DepartureTime',
        render: (v: string) => v && moment(v).format('HH:mm DD-MM-YYYY')
      },
      {
        title: t('reports.timeReport.columns.TotalHours'),
        dataIndex: 'Total',
        key: 'Total'
      }
    ]
  }
];
