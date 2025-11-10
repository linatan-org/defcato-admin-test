export const getColumns = (t: any): any => [
  {
    title: t('reports.ordersReports.ItemsReport'),
    children: [
      {
        title: t('reports.ordersReports.ItemsTotalReport.columns.ItemCode'),
        width: 100,
        dataIndex: 'ItemCode',
        key: 'ItemCode'
      },
      {
        title: t('reports.ordersReports.ItemsTotalReport.columns.ItemDescription'),
        width: 100,
        dataIndex: 'ItemDescription',
        key: 'ItemDescription'
      },
      {
        title: t('reports.ordersReports.ItemsTotalReport.columns.TotalQuantity'),
        width: 100,
        dataIndex: 'TotalQuantity',
        key: 'TotalQuantity'
      },
      {
        title: t('reports.ordersReports.ItemsTotalReport.columns.TotalAmount'),
        width: 100,
        dataIndex: 'TotalAmount',
        key: 'TotalAmount'
      }
    ]
  }
];
