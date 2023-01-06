export const getColumns = (t: any): any => [
  {
    title: '',
    children: [
      {
        title: t('reports.targetReports.columns.Description'),
        dataIndex: 'Description',
        key: 'Description'
      },
      {
        title: t('reports.targetReports.columns.Bonus'),
        dataIndex: 'Bonus',
        key: 'Bonus'
      }
    ]
  }
];
