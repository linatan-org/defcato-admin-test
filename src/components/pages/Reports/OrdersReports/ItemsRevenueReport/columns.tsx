export const getColumns = (t: any): any => [
  {
    title: t('reports.ordersReports.ItemsRevenueReportTitle'),
    children: [
      {
        title: t('reports.ordersReports.ItemsRevenueReport.columns.ItemCode'),
        width: 100,
        dataIndex: 'ItemCode',
        key: 'ItemCode'
      },
      {
        title: t('reports.ordersReports.ItemsRevenueReport.columns.ItemDescription'),
        width: 100,
        dataIndex: 'ItemDescription',
        key: 'ItemDescription'
      },
      {
        title: t('reports.ordersReports.ItemsRevenueReport.columns.TotalQuantity'),
        width: 100,
        dataIndex: 'TotalQuantity',
        key: 'TotalQuantity'
      },
      {
        title: t('reports.ordersReports.ItemsRevenueReport.columns.TotalAmount'),
        width: 100,
        dataIndex: 'TotalAmount',
        key: 'TotalAmount'
      },
      {
        title: t('reports.ordersReports.ItemsRevenueReport.columns.TotalAmountBeforeVat'),
        width: 100,
        dataIndex: 'TotalAmountBeforeVat',
        key: 'TotalAmountBeforeVat'
      },
      {
        title: t('reports.ordersReports.ItemsRevenueReport.columns.Cost'),
        width: 100,
        dataIndex: 'Cost',
        key: 'Cost'
      },
      {
        title: t('reports.ordersReports.ItemsRevenueReport.columns.Revenue'),
        width: 100,
        dataIndex: 'Revenue',
        key: 'Revenue'
      },
      {
        title: t('reports.ordersReports.ItemsRevenueReport.columns.RevenuePercent'),
        width: 100,
        dataIndex: 'RevenuePercent',
        key: 'RevenuePercent'
      }
    ]
  }
];
