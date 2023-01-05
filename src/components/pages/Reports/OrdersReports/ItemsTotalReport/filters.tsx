import { API } from '../../../../../server';
import { IOrderFilterValues, RESPONSE_STATUSES } from '../../../../../server/models';
import { IFilterItem } from '../../../../filters/FIlterItem';

const SELECT_FIELD_NAMES = {
  label: 'Value',
  value: 'Key'
};

export const getFilters = (filtersOptions: IOrderFilterValues | null, t: any): IFilterItem[] => {
  return [
    {
      type: 'DATE',
      key: 'CreatedDate',
      label: t('reports.ordersReports.filters.CreatedDate'),
      datesKeys: {
        FromKey: 'FromCreatedDate',
        ToKey: 'ToCreatedDate'
      }
    },
    {
      type: 'DATE',
      key: 'SupplyDate',
      label: t('reports.ordersReports.filters.SupplyDate'),
      datesKeys: {
        FromKey: 'FromDeliveryDate',
        ToKey: 'ToDeliveryDate'
      }
    },
    {
      type: 'MULTI',
      key: 'DeliveryBranchList',
      label: t('reports.ordersReports.filters.DeliveryBranch'),
      options: filtersOptions ? filtersOptions['DeliveryBranchList'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'SINGLE_API',
      key: 'CategoryCode',
      label: t('reports.ordersReports.filters.Category'),
      getItems: async (v) => {
        return await API.keyboard.getCreateItems(v).then((res) => {
          if (res.ErrorCode === RESPONSE_STATUSES.OK) {
            return res.Categories || [];
          }
          return [];
        });
      }
    },
    {
      type: 'SINGLE_API',
      key: 'ItemCode',
      label: t('reports.ordersReports.filters.Item'),
      getItems: async (v) => {
        return await API.keyboard.getCreateItems(v).then((res) => {
          if (res.ErrorCode === RESPONSE_STATUSES.OK) {
            return res.Items || [];
          }
          return [];
        });
      }
    }
  ];
};
