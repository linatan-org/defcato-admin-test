export const getCatalogTableColumns = (t: any): any => [
  {
    title: t('sellers.sellersTableTitle'),
    children: [
      {
        title: t('sellers.SellerCode'),
        dataIndex: 'SellerCode',
        key: 'SellerCode'
      },
      {
        title: t('sellers.Name'),
        dataIndex: 'Name',
        key: 'Name'
      },
      {
        title: t('sellers.CellPhone'),
        dataIndex: 'CellPhone',
        key: 'CellPhone'
      }
    ]
  }
];
