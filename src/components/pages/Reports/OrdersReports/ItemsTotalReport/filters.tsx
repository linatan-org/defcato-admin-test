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
      selectFieldNames: SELECT_FIELD_NAMES,
      getItems: async (v) => {
        return await API.keyboard.getCreateItems(v, 'CategoryCode').then((res) => {
          if (res.ErrorCode === RESPONSE_STATUSES.OK) {
            return res.Categories || [];
          }
          return [];
        });
      }
    },
    {
      type: 'MULTI_API',
      key: 'ItemCodes',
      label: t('reports.ordersReports.filters.Item'),
      selectFieldNames: SELECT_FIELD_NAMES,
      getItems: async (v) => {
        return await API.keyboard.getCreateItems(v, 'ItemCode').then((res) => {
          if (res.ErrorCode === RESPONSE_STATUSES.OK) {
            return res.Items || [];
          }
          return [];
        });
      }
    }
  ];
};
export const getAdditionalFilters = (filtersOptions: IOrderFilterValues | null, t: any): IFilterItem[] => {
  return [
    {
      type: 'SINGLE',
      key: 'ItemsSummaryType',
      label: t('reports.ordersReports.filters.ItemsSummaryTypes'),
      options: filtersOptions ? filtersOptions['ItemsSummaryTypes'] : [],
      showSearch: true,
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'BOOLEAN',
      key: 'IsIncludeKitItems',
      label: t('reports.ordersReports.filters.IncludeKitItems')
    }
  ];
};
