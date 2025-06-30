export const getCouponTableColumns = (t: any): any => [
  {
    title: t('reports.subscribeReports.title'),
    children: [
      {
        title: t('reports.subscribeReports.columns.Date'),
        dataIndex: 'OpDate',
        key: 'OpDate'
      },
      {
        title: t('reports.subscribeReports.columns.UserName'),
        dataIndex: 'UserName',
        key: 'UserName'
      },
      {
        title: t('reports.subscribeReports.columns.CustomerName'),
        dataIndex: 'MemberName',
        key: 'MemberName'
      },
      {
        title: t('reports.subscribeReports.columns.CustomerCard'),
        dataIndex: 'MemberCard',
        key: 'MemberCard'
      },
      {
        title: t('reports.subscribeReports.columns.Operation'),
        dataIndex: 'Operation',
        key: 'Operation'
      }
    ]
  }
];
