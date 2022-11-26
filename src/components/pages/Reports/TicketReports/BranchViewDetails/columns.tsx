export const getColumns = (t: any): any => [
  {
    title: '',
    children: [
      {
        title: t('reports.ticketReports.CategoryName'),
        dataIndex: 'CategoryName',
        key: 'CategoryName'
      },
      {
        title: t('reports.ticketReports.TotalTickets'),
        dataIndex: 'TotalTickets',
        key: 'TotalTickets'
      }
    ]
  }
];
