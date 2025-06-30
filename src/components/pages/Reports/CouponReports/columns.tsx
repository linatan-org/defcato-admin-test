export const getCouponTableColumns = (t: any): any => [
  {
    title: t('reports.couponReports.couponReportsTitle'),
    children: [
      {
        title: t('reports.couponReports.columns.ProducedDate'),
        dataIndex: 'ProducedDate',
        key: 'ProducedDate'
      },
      {
        title: t('reports.couponReports.columns.Number'),
        dataIndex: 'CouponNumber',
        key: 'CouponNumber'
      },
      {
        title: t('reports.couponReports.columns.Value'),
        dataIndex: 'Amount',
        key: 'Amount'
      },
      {
        title: t('reports.couponReports.columns.ResponsibleBranch'),
        dataIndex: 'ResponsibleBranch',
        key: 'ResponsibleBranch'
      }
    ]
  }
];
