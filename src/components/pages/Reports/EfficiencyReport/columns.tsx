export const getColumns = (t: any): any => [
  {
    title: t('reports.efficiencyReports.NotCompletedOrdersDetails'),
    children: [
      {
        title: t('reports.efficiencyReports.columns.Reason'),
        dataIndex: 'Description',
        key: 'Description'
      },
      {
        title: t('reports.efficiencyReports.columns.Total'),
        dataIndex: 'Total',
        key: 'Total'
      },
      {
        title: t('reports.efficiencyReports.TotalOrders'),
        dataIndex: 'TotalOrders',
        key: 'TotalOrders'
      }
    ]
  }
];

export const getColumnsByUser = (t: any): any => [
  {
    title: t('reports.efficiencyReports.NotCompletedOrdersDetails'),
    children: [
      {
        title: t('reports.efficiencyReports.columns.ReasonByUser'),
        dataIndex: 'Description',
        key: 'Description'
      },
      {
        title: t('reports.efficiencyReports.columns.Total'),
        dataIndex: 'Total',
        key: 'Total'
      }
    ]
  }
];

export const getColumnsByReason = (t: any): any => [
  {
    title: t('reports.efficiencyReports.NotCompletedOrdersDetails'),
    children: [
      {
        title: t('reports.efficiencyReports.columns.User'),
        dataIndex: 'Description',
        key: 'Description'
      },
      {
        title: t('reports.efficiencyReports.columns.Total'),
        dataIndex: 'Total',
        key: 'Total'
      }
    ]
  }
];
