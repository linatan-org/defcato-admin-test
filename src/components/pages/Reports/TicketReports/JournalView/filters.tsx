import { API } from '../../../../../server';
import { ITicketFilters, RESPONSE_STATUSES } from '../../../../../server/models';
import { IFilterItem } from '../../../../filters/FIlterItem';

const SELECT_FIELD_NAMES = {
  label: 'Value',
  value: 'Key'
};

export const getFilters = (filtersOptions: ITicketFilters | null, t: any, disabledDateRange: boolean): IFilterItem[] => {
  return [
    {
      type: 'DATE',
      key: 'dateRange',
      disabled: disabledDateRange
    },
    {
      type: 'SINGLE',
      key: 'OpenDateRange',
      options: filtersOptions ? filtersOptions['OpenDateRanges'] : [],
      selectFieldNames: SELECT_FIELD_NAMES,
      defaultValue:
        filtersOptions &&
        filtersOptions['OpenDateRanges'] &&
        filtersOptions['OpenDateRanges'][0] &&
        filtersOptions['OpenDateRanges'][0]['Key'],
      label: t('reports.ticketReports.filterTitles.OpenDateRanges')
    },
    {
      type: 'SINGLE',
      key: 'TicketRequestType',
      options: filtersOptions ? filtersOptions['TicketRequestTypes'] : [],
      selectFieldNames: SELECT_FIELD_NAMES,
      label: t('reports.ticketReports.filterTitles.TicketRequestTypes')
    },
    {
      type: 'SINGLE',
      key: 'TicketStatus',
      options: filtersOptions ? filtersOptions['StatusList'] : [],
      selectFieldNames: SELECT_FIELD_NAMES,
      label: t('reports.ticketReports.filterTitles.StatusList')
    },
    {
      type: 'SINGLE',
      key: 'BranchSysId',
      options: filtersOptions ? filtersOptions['BranchList'] : [],
      selectFieldNames: SELECT_FIELD_NAMES,
      label: t('reports.ticketReports.filterTitles.BranchList'),
      showSearch: true,
      searchKeys: ['Value']
    },
    {
      type: 'SINGLE_API',
      key: 'ItemCode',
      selectFieldNames: SELECT_FIELD_NAMES,
      label: t('reports.ticketReports.filterTitles.ItemCode'),
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
      type: 'SINGLE',
      key: 'InformationType',
      options: filtersOptions ? filtersOptions['InformationTypes'] : [],
      selectFieldNames: SELECT_FIELD_NAMES,
      label: t('reports.ticketReports.filterTitles.InformationTypes')
    }
  ];
};
