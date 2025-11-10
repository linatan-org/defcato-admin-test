import { IFilterItem } from '../../../../filters/FIlterItem';

export const getSalesFilters = (): IFilterItem[] => {
  return [
    {
      type: 'DATE',
      key: 'dateRange'
    }
  ];
};
