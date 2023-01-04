export const getColumns = (t: any): any => [
  {
    title: t('reports.ordersReports.OrdersByProperties'),
    children: [
      {
        title: t('reports.ordersReports.OrdersTotalReport.columns.BranchNetCode'),
        width: 100,
        dataIndex: 'BranchNetCode',
        key: 'BranchNetCode'
      },
      {
        title: t('reports.ordersReports.OrdersTotalReport.columns.BranchName'),
        width: 100,
        dataIndex: 'BranchName',
        key: 'BranchName'
      },
      {
        title: t('reports.ordersReports.OrdersTotalReport.columns.TotalOrders'),
        width: 100,
        dataIndex: 'TotalOrders',
        key: 'TotalOrders'
      },
      {
        title: t('reports.ordersReports.OrdersTotalReport.columns.TotalAmountAfterVat'),
        width: 100,
        dataIndex: 'TotalAmountAfterVat',
        key: 'TotalAmountAfterVat'
      },
      {
        title: t('reports.ordersReports.OrdersTotalReport.columns.TotalAmountBeforeVat'),
        width: 100,
        dataIndex: 'TotalAmountBeforeVat',
        key: 'TotalAmountBeforeVat'
      },
      {
        title: t('reports.ordersReports.OrdersTotalReport.columns.TotalItems'),
        width: 100,
        dataIndex: 'TotalItems',
        key: 'TotalItems'
      },
      {
        title: t('reports.ordersReports.OrdersTotalReport.columns.OrderAVG'),
        width: 100,
        dataIndex: 'OrderAVG',
        key: 'OrderAVG'
      }
    ]
  }
];
