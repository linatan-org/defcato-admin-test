import { IFilterItem } from '../../../filters/FIlterItem';
import { IActivityReportFilter, IActivityReportFiltersResponse } from '../../../../server/models';

const SELECT_FIELD_NAMES = {
  label: 'Name',
  value: 'SysId'
};
export const getSalesFilters = (
  filtersOptions: IActivityReportFiltersResponse,
  accountValues: IActivityReportFilter[]
): IFilterItem[] => {
  return [
    {
      type: 'DATE',
      key: 'dateRange'
    },
    {
      type: 'SINGLE',
      key: 'Site',
      label: 'Site',
      options: filtersOptions ? filtersOptions['Sites'] : [],
      showSearch: true,
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'SINGLE',
      key: 'Account',
      label: 'Account',
      options: accountValues,
      showSearch: true,
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'SINGLE',
      key: 'Issue',
      label: 'Issue',
      options: filtersOptions ? filtersOptions['Issues'] : [],
      showSearch: true,
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'SINGLE',
      key: 'ReportType',
      label: 'Report Type',
      options: filtersOptions ? filtersOptions['ReportTypes'] : [],
      showSearch: true,
      selectFieldNames: SELECT_FIELD_NAMES
    },
    {
      type: 'SINGLE',
      key: 'Status',
      label: 'Status',
      options: filtersOptions ? filtersOptions['StatusList'] : [],
      showSearch: true,
      selectFieldNames: SELECT_FIELD_NAMES
    }
  ];
};
