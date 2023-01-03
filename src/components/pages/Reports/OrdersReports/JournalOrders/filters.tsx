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
      label: t('reports.ordersReports.CreatedDate'),
      datesKeys: {
        FromKey: 'FromCreatedDate',
        ToKey: 'ToCreatedDate'
      }
    },
    {
      type: 'DATE',
      key: 'SupplyDate',
      label: t('reports.ordersReports.SupplyDate'),
      datesKeys: {
        FromKey: 'FromDeliveryDate',
        ToKey: 'ToDeliveryDate'
      }
    },
    {
      type: 'MULTI',
      key: 'StatusList',
      label: t('reports.ordersReports.Status'),
      options: filtersOptions ? filtersOptions['StatusList'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'MULTI',
      key: 'DeliveryTypes',
      label: t('reports.ordersReports.DeliveryType'),
      options: filtersOptions ? filtersOptions['DeliveryTypes'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'MULTI',
      key: 'BranchList',
      label: t('reports.ordersReports.Branch'),
      options: filtersOptions ? filtersOptions['BranchList'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'MULTI',
      key: 'DeliveryBranchList',
      label: t('reports.ordersReports.DeliveryBranch'),
      options: filtersOptions ? filtersOptions['DeliveryBranchList'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'INPUT_NUMBER',
      key: 'FromAmount',
      label: t('reports.ordersReports.FromAmount')
    },
    {
      type: 'INPUT_NUMBER',
      key: 'ToAmount',
      label: t('reports.ordersReports.ToAmount')
    },
    {
      type: 'INPUT',
      key: 'SellerCode',
      label: t('reports.ordersReports.Seller')
    },
    {
      type: 'INPUT',
      key: 'MemberSysId',
      label: t('reports.ordersReports.Customer')
    },
    {
      type: 'INPUT',
      key: 'OrderNumber',
      label: t('reports.ordersReports.Order')
    },
    {
      type: 'SINGLE_API',
      key: 'CategoryCode',
      label: t('reports.ordersReports.Category'),
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
      label: t('reports.ordersReports.Item'),
      getItems: async (v) => {
        return await API.keyboard.getCreateItems(v).then((res) => {
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
      label: t('reports.ordersReports.PaymentMethod'),
      options: filtersOptions ? filtersOptions['PaymentMethods'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'MULTI',
      key: 'MemberTypes',
      label: t('reports.ordersReports.MemberType'),
      options: filtersOptions ? filtersOptions['MemberTypes'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'MULTI',
      key: 'TranTypes',
      label: t('reports.ordersReports.TransactionType'),
      options: filtersOptions ? filtersOptions['TranTypes'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'MULTI',
      key: 'CancelReasons',
      label: t('reports.ordersReports.CancelReason'),
      options: filtersOptions ? filtersOptions['CancelReasons'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'INPUT',
      key: 'City',
      label: t('reports.ordersReports.City')
    },
    {
      type: 'MULTI',
      key: 'PromoId',
      label: t('reports.ordersReports.Promotion'),
      options: filtersOptions ? filtersOptions['Promotions'] : [],
      selectFieldNames: SELECT_FIELD_NAMES
    }
  ];
};
