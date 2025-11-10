import { CloseCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { IItem } from '../../../../../server/models';

export const getItemsColumns = (t: any, onRemoveItem: (item: IItem) => void): ColumnsType<IItem> => [
  {
    title: t('reports.saleReports.deviceTranReference'),
    dataIndex: 'Key',
    key: 'Key'
  },
  {
    title: t('reports.saleReports.tranType'),
    dataIndex: 'Value',
    key: 'Value'
  },
  {
    title: '',
    dataIndex: '',
    key: 'remove',
    width: 50,
    render: (item) => (
      <div
        className="flex flex-1 items-center justify-center"
        onClick={() => onRemoveItem(item)}
      >
        <CloseCircleOutlined
          className="removeIcon"
          width="1em"
        />
      </div>
    )
  }
];
