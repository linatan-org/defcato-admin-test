import React from 'react';
import { Button, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { FilterItem, IFilterItem } from './FIlterItem';

const { Text } = Typography;

interface IFilters {
  filters: IFilterItem[];
  filtersValues: any;
  onChange: (filters: any) => void;
  value?: any;
  onSearch?: () => void;
}

const getCorrectDate = (date: string) => {
  // current date format is DD/MM/yyyy
  const splitDate = date.split('/');
  return `${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`;
};

const Filters: React.FC<IFilters> = ({ filters, onChange, filtersValues, onSearch }) => {
  const { t } = useTranslation();
  const getFilterValue = (filter: IFilterItem) => {
    let replacedFrom;
    let replacedTo;
    if (filter.datesKeys) {
      const FromDate = filtersValues[filter.datesKeys.FromKey];
      const ToDate = filtersValues[filter.datesKeys.ToKey];
      replacedFrom = FromDate ? getCorrectDate(FromDate) : null;
      replacedTo = ToDate ? getCorrectDate(ToDate) : null;
    } else {
      const { FromDate, ToDate } = filtersValues;
      replacedFrom = FromDate ? getCorrectDate(FromDate) : null;
      replacedTo = FromDate ? getCorrectDate(ToDate) : null;
    }
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
            let isEmptyDate = false;
            if (filter.type === 'DATE') {
              if (filter.datesKeys) {
                const ToKey = filter.datesKeys.ToKey;
                const FromKey = filter.datesKeys.FromKey;
                isEmptyDate = !value[FromKey] && !value[ToKey];
                if (isEmptyDate) {
                  delete filtersValues[FromKey];
                  delete filtersValues[ToKey];
                }
              } else {
                isEmptyDate = !value['FromDate'] && !value['ToDate'];
                if (isEmptyDate) {
                  delete filtersValues['FromDate'];
                  delete filtersValues['ToDate'];
                }
              }
            }
            // eslint-disable-next-line
            const newValue = filter.type === 'DATE' && !isEmptyDate ? { ...value } : filter.type === 'DATE' && isEmptyDate ? {} : { [filter.key]: value };
            console.log({ ...filtersValues, ...newValue }, 'newValuenewValuenewValuenewValue');
            onChange({ ...filtersValues, ...newValue });
          }}
        />
      </div>
    );
  };

  return (
    <div className="pt-2 pb-6 flex items-center justify-start flex-wrap">
      {filters.map(renderFilterItem)}
      {onSearch ? (
        <Button
          className="mt-10"
          size="large"
          type="primary"
          onClick={onSearch}
        >
          {t('search')}
        </Button>
      ) : null}
    </div>
  );
};

export default Filters;
