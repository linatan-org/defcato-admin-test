import { IFilterItem } from '../../../filters/FIlterItem';

export const getCatalogFilters = (t: any): IFilterItem[] => {
  return [
    {
      type: 'INPUT',
      key: 'InputData',
      addonBefore: t('reports.catalog.filterTitle')
    }
  ];
};
