import { IActivityReport, IActivityReportFilter } from '../../../../server/models';
import moment from 'moment/moment';
import { Button, Select } from 'antd';
import React from 'react';

const SELECT_FIELD_NAMES = {
  label: 'Name',
  value: 'SysId'
};

export const getColumns = (
  onOpenDetails: (info: string) => void,
  sitesValues: IActivityReportFilter[],
  onChangeStatus: (statusId: number, sysId: number) => void
): any => [
  {
    title: 'Activity Report',
    children: [
      {
        title: 'Report Date',
        dataIndex: 'ReportDate',
        key: 'ReportDate',
        render: (v: string) => moment(v).format('DD/MM/yyyy')
      },
      {
        title: 'Site Name',
        dataIndex: 'SiteName',
        key: 'SiteName'
      },
      {
        title: 'Account Name',
        dataIndex: 'AccountName',
        key: 'AccountName'
      },
      {
        title: 'Issue',
        dataIndex: 'Issue',
        key: 'Issue'
      },
      {
        title: 'Type Description',
        dataIndex: 'TypeDescription',
        key: 'TypeDescription'
      },
      {
        title: 'Status Description',
        dataIndex: 'StatusDescription',
        key: 'StatusDescription',
        render: (v: number, obj: IActivityReport) => (
          <div className="flex items-end justify-end">
            <Select
              className="w-40"
              fieldNames={SELECT_FIELD_NAMES}
              value={v}
              options={sitesValues}
              placeholder={'Site'}
              onChange={(statusId) => onChangeStatus(statusId, obj.SysId)}
            />
          </div>
        )
      },
      {
        title: 'SysId',
        dataIndex: 'SysId',
        key: 'SysId'
      },
      {
        title: '',
        dataIndex: 'Info',
        key: 'Info',
        render: (v: string, obj: any) => (
          <Button
            className="w-30"
            type="primary"
            size="small"
            onClick={() => onOpenDetails(v)}
          >
            View details
          </Button>
        )
      }
    ]
  }
];
