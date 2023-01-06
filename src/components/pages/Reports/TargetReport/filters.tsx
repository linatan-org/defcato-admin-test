import { IFilterItem } from '../../../filters/FIlterItem';
import moment from 'moment';

export const getSalesFilters = (): IFilterItem[] => {
  return [
    {
      type: 'MONTH_DATE',
      key: 'SelectedMonth',
      defaultValue: moment()
    }
  ];
};
