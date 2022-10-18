export const getCatalogTableColumns = (t: any): any => [
  {
    title: t('reports.saleReports.salesReports'),
    children: [
      {
        title: t('reports.catalog.ItemCode'),
        dataIndex: 'Code',
        key: 'Code'
      },
      {
        title: t('reports.catalog.Description'),
        dataIndex: 'Description',
        key: 'Description'
      },
      {
        title: t('reports.catalog.Price'),
        dataIndex: 'Price',
        key: 'Price'
      }
    ]
  }
];
