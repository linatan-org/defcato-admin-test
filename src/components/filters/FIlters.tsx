import React from 'react';
import { Button, Popconfirm, Space, Upload } from 'antd';
import { FilterItem, IFilterItem } from './FIlterItem';

interface IFilters {
  filters: IFilterItem[];
  filtersValues: any;
  onChange: (filters: any) => void;
}

const Filters: React.FC<IFilters> = ({ filters, onChange, filtersValues }) => {
  const renderFilterItem = (filter: IFilterItem) => {
    return (
      <div
        key={filter.key}
        className="w-64 pt-4 pl-4"
      >
        <FilterItem
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
