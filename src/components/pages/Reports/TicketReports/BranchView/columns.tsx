export const getSaleReportsTableColumns = (t: any): any => [
  {
    title: t('reports.ticketReports.branchViewTitle'),
    children: [
      {
        title: t('reports.ticketReports.branchName'),
        dataIndex: 'BranchName',
        key: 'BranchName'
      },
      {
        title: t('reports.ticketReports.totalOrders'),
        dataIndex: 'TotalOrders',
        key: 'TotalOrders'
      },
      {
        title: t('reports.ticketReports.totalTickets'),
        dataIndex: 'TotalTickets',
        key: 'TotalTickets'
      },
      {
        title: t('reports.ticketReports.ticketsPerOrder'),
        dataIndex: 'TicketsPerOrder',
        key: 'TicketsPerOrder',
        render: (v: number) => `${v * 100}%`
      }
    ]
  }
];
