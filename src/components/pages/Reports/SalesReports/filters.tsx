import { API } from '../../../../server';
import { IOrderFilterValues, RESPONSE_STATUSES } from '../../../../server/models';
import { IFilterItem } from '../../../filters/FIlterItem';

const SELECT_FIELD_NAMES = {
  label: 'Value',
  value: 'Key'
};

export const getSalesFilters = (filtersOptions: IOrderFilterValues | null, t: any): IFilterItem[] => {
  return [
    {
      type: 'DATE',
      key: 'dateRange'
    },
    {
      type: 'INPUT_NUMBER',
      key: 'FromAmount',
      label: t('reports.ordersReports.filters.FromAmount')
    },
    {
      type: 'INPUT_NUMBER',
      key: 'ToAmount',
      label: t('reports.ordersReports.filters.ToAmount')
    },
    {
      type: 'MULTI',
      key: 'BranchList',
      label: t('reports.ordersReports.filters.Branch2'),
      options: filtersOptions ? filtersOptions['BranchList'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'SINGLE',
      key: 'SellerCode',
      label: t('reports.ordersReports.filters.Seller'),
      options: filtersOptions ? filtersOptions['Sellers'] : [],
      showSearch: true,
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'INPUT',
      key: 'MemberSysId',
      label: t('reports.ordersReports.filters.Customer')
    },
    {
      type: 'INPUT',
      key: 'OrderNumber',
      label: t('reports.ordersReports.filters.Order2')
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
      type: 'SINGLE_API',
      key: 'ItemCode',
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
    },
    {
      type: 'MULTI',
      key: 'PaymentMethods',
      label: t('reports.ordersReports.filters.PaymentMethod'),
      options: filtersOptions ? filtersOptions['PaymentMethods'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'MULTI',
      key: 'TranTypes',
      label: t('reports.ordersReports.filters.TransactionType'),
      options: filtersOptions ? filtersOptions['TranTypes'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    }
  ];
};
