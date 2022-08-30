export const getItemsColumns = (t: any): any => [
  {
    title: t('reports.saleReports.deviceTranReference'),
    dataIndex: 'Key',
    key: 'Key'
  },
  {
    title: t('reports.saleReports.tranType'),
    dataIndex: 'Value',
    key: 'Value'
  }
];
