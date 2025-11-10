export const getSaleReportsTableColumns = (t: any): any => [
  {
    title: t('navMenu.targetReports'),
    children: [
      {
        title: t('dashboard.dailyUserStats.name'),
        dataIndex: 'Name',
        key: 'Name'
      },
      {
        title: t('dashboard.dailyStats.totalOrders'),
        dataIndex: 'TotalOrders',
        key: 'TotalOrders'
      },
      {
        title: t('dashboard.dailyStats.totalRevenueTitle'),
        dataIndex: 'TotalRevenue',
        key: 'TotalRevenue'
      },
      {
        title: t('dashboard.dailyStats.callsOrdersConversion'),
        dataIndex: 'CallsOrdersConversion',
        key: 'CallsOrdersConversion'
      },
      {
        title: t('reports.targetReports.columns.Bonuses'),
        dataIndex: 'Bonuses',
        key: 'Bonuses'
      }
    ]
  }
];
