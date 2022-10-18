import React from 'react';
import { Button, Popconfirm, Space, Upload } from 'antd';
import moment from 'moment';
import { FilterItem, IFilterItem } from './FIlterItem';

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
    console.log(FromDate, ToDate, 'FromDate, ToDate');
    const replacedFrom = FromDate ? getCorrectDate(FromDate) : null;
    const replacedTo = FromDate ? getCorrectDate(ToDate) : null;
    switch (filter.type) {
      case 'DATE': {
        return filter.type === 'DATE' && replacedFrom && replacedTo
          ? [moment(replacedFrom), moment(replacedTo)]
          : [moment(), moment()];
      }
      default:
        return filtersValues.value || filtersValues[filter.key];
    }
  };

  const renderFilterItem = (filter: IFilterItem) => {
    return (
      <div
        key={filter.key}
        className="w-64 pt-4 pl-4"
      >
        <FilterItem
          {...filter}
          value={getFilterValue(filter)}
          type={filter.type}
          key={filter.key}
          onChange={(value: any) => {
            const newValue = filter.type === 'DATE' ? { ...value } : { [filter.key]: value };
            onChange({ ...filtersValues, ...newValue });
          }}
        />
      </div>
    );
  };

  return <div className="pt-2 pb-6 flex items-center justify-start flex-wrap">{filters.map(renderFilterItem)}</div>;
};

export default Filters;
