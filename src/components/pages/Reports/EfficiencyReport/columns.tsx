export const getColumns = (t: any, isByUser: boolean): any => [
  {
    title: isByUser
      ? t('reports.efficiencyReports.ConversationDetails')
      : t('reports.efficiencyReports.NotCompletedOrdersDetails'),
    children: [
      {
        title: isByUser ? t('reports.efficiencyReports.columns.UserName') : t('reports.efficiencyReports.columns.Reason'),
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

export const getColumnsByUserMain = (t: any): any => [
  {
    title: t('reports.efficiencyReports.ConversationDetails'),
    children: [
      {
        title: t('reports.efficiencyReports.columns.UserName'),
        dataIndex: 'Description',
        key: 'Description'
      },
      {
        title: t('reports.efficiencyReports.TotalOrders'),
        dataIndex: 'TotalOrders',
        key: 'TotalOrders'
      },
      {
        title: t('reports.efficiencyReports.columns.NotCompletedOrders'),
        dataIndex: 'NotCompletedOrders',
        key: 'NotCompletedOrders'
      },
      {
        title: t('reports.efficiencyReports.CallsOrdersConversion'),
        dataIndex: 'CallsOrdersConversion',
        key: 'CallsOrdersConversion'
      }
    ]
  }
];

export const getColumnsByReasonMain = (t: any): any => [
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
