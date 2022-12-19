import React from 'react';
import { Typography } from 'antd';
import moment from 'moment';
import { FilterItem, IFilterItem } from './FIlterItem';

const { Text } = Typography;

interface IFilters {
  filters: IFilterItem[];
  filtersValues: any;
  onChange: (filters: any) => void;
  value?: any;
}

const getCorrectDate = (date: string) => {
  // current date format is DD/MM/yyyy
  const splitDate = date.split('/');
  return `${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`;
};

const Filters: React.FC<IFilters> = ({ filters, onChange, filtersValues }) => {
  const getFilterValue = (filter: IFilterItem) => {
    const { FromDate, ToDate } = filtersValues;
    const replacedFrom = FromDate ? getCorrectDate(FromDate) : null;
    const replacedTo = FromDate ? getCorrectDate(ToDate) : null;
    switch (filter.type) {
      case 'DATE': {
        return filter.type === 'DATE' && replacedFrom && replacedTo ? [moment(replacedFrom), moment(replacedTo)] : null;
      }
      default:
        return filtersValues.value || filtersValues[filter.key];
    }
  };

  const renderFilterItem = (filter: IFilterItem) => {
    return (
      <div
        key={filter.key}
        className={`filterMinWidth ${filter.type !== 'DATE' && 'w-64'} pt-4 pl-4`}
      >
        <div className="filterLabelWrapper mb-1">
          <Text
            className={`${!filter.label && 'invisibleText'}`}
            strong
          >
            {filter.label || 'inv'}
          </Text>
        </div>
        <FilterItem
          {...filter}
          value={getFilterValue(filter)}
          type={filter.type}
          key={filter.key}
          onChange={(value: any) => {
            const isEmptyDate = filter.type === 'DATE' && !value['FromDate'] && !value['ToDate'];
            if (isEmptyDate) {
              delete filtersValues['FromDate'];
              delete filtersValues['ToDate'];
            }
            // eslint-disable-next-line
            const newValue = filter.type === 'DATE' && !isEmptyDate ? { ...value } : filter.type === 'DATE' && isEmptyDate ? {} : { [filter.key]: value };
            onChange({ ...filtersValues, ...newValue });
          }}
        />
      </div>
    );
  };

  return <div className="pt-2 pb-6 flex items-center justify-start flex-wrap">{filters.map(renderFilterItem)}</div>;
};

export default Filters;
