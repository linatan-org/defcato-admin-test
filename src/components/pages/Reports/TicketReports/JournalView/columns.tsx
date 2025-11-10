export const getSaleReportsTableColumns = (t: any): any => [
  {
    title: t('reports.ticketReports.journalViewTitle'),
    children: [
      {
        title: t('reports.ticketReports.SysId'),
        dataIndex: 'SysId',
        key: 'SysId'
      },
      {
        title: t('reports.ticketReports.CreatorUserDescription'),
        dataIndex: 'CreatorUserDescription',
        key: 'CreatorUserDescription'
      },
      {
        title: t('reports.ticketReports.CreatedDate'),
        dataIndex: 'CreatedDate',
        key: 'CreatedDate'
      },
      {
        title: t('reports.ticketReports.MemberName'),
        dataIndex: 'MemberName',
        key: 'MemberName'
      },
      {
        title: t('reports.ticketReports.TicketTypeDescription'),
        dataIndex: 'TicketTypeDescription',
        key: 'TicketTypeDescription'
      },
      {
        title: t('reports.ticketReports.RequestTypeDescription'),
        dataIndex: 'RequestTypeDescription',
        key: 'RequestTypeDescription'
      },
      {
        title: t('reports.ticketReports.ItemCode'),
        dataIndex: 'ItemCode',
        key: 'ItemCode'
      },
      {
        title: t('reports.ticketReports.BranchName'),
        dataIndex: 'BranchName',
        key: 'BranchName'
      },
      {
        title: t('reports.ticketReports.StatusDescription'),
        dataIndex: 'StatusDescription',
        key: 'StatusDescription'
      },
      {
        title: t('reports.ticketReports.InformationType'),
        dataIndex: 'InformationType',
        key: 'InformationType'
      }
    ]
  }
];
