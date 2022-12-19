import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Input, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import './styles.scss';
import useDebounceValue from '../hooks/useDebounce';
const { Text } = Typography;

type FilterType = 'MULTI' | 'SINGLE' | 'SINGLE_API' | 'DATE' | 'SWITCH' | 'SINGLE_DATE' | 'INPUT';

export interface IFilterItem {
  label?: string;
  type: FilterType;
  key: string;
  name?: string;
  displayKey?: string;
  valueKey?: string;
  onChange?: (v: any) => void;
  value?: any;
  addonAfter?: string;
  addonBefore?: string;
  options?: any[];
  selectValueKey?: string;
  selectDisplayKey?: string;
  selectFieldNames?: { value: string; label: string };
  disabled?: boolean;
  showSearch?: boolean;
  defaultValue?: any;
  getItems?: (search: string) => Promise<any[]>;
}

const { RangePicker } = DatePicker;

const getSelectOptions = (selectValueKey?: string, selectDisplayKey?: string, values?: any[]) => {
  // eslint-disable-next-line
  return values ? values.map((val) => ({label: selectDisplayKey ? val[selectDisplayKey] : '', value: selectValueKey ? val[selectValueKey]: ''})) : [];
};

export const FilterItem: React.FC<IFilterItem> = ({
  type,
  onChange,
  value,
  addonAfter,
  addonBefore,
  options,
  selectValueKey,
  selectDisplayKey,
  selectFieldNames,
  disabled,
  showSearch,
  getItems,
  defaultValue
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [singleApiOptions, setSingleApiOptions] = useState<any[]>([]);
  const debouncedInputValue = useDebounceValue<string>(inputValue, 700);

  useEffect(() => {
    if (type === 'SINGLE_API' && getItems) {
      getSingleApiOptions('');
    }
  }, []);
  useEffect(() => {
    if (type === 'INPUT' && debouncedInputValue && debouncedInputValue.length >= 3) {
      onChange && onChange(inputValue);
    }
    if (type === 'SINGLE_API' && getItems && debouncedInputValue && debouncedInputValue.length >= 3) {
      getSingleApiOptions(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    if (type === 'INPUT' && inputValue === '') {
      onChange && onChange(inputValue);
    }
    if (type === 'SINGLE_API') {
      setIsLoading(true);
    }
  }, [inputValue]);

  const getSingleApiOptions = async (search: string) => {
    if (getItems) {
      const items = await getItems(search);
      setIsLoading(false);
      setSingleApiOptions(items);
    }
  };
  switch (type) {
    case 'DATE': {
      return (
        <div className="datepickerWrapRangePicker">
          <RangePicker
            disabled={!!disabled}
            className="datePickerRangePicker"
            value={!value ? null : value}
            format={'DD/MM/yyyy'}
            suffixIcon={<CalendarOutlined className="datePicker_icon" />}
            onChange={(v, s) => {
              const FromDate = s[0] || undefined;
              const ToDate = s[1] || undefined;
              onChange && onChange({ FromDate, ToDate });
            }}
          />
        </div>
      );
    }
    case 'INPUT': {
      return (
        <div className="datepickerWrapRangePicker">
          <Input
            disabled={!!disabled}
            className="datePickerRangePicker"
            value={inputValue || value || ''}
            onChange={(e) => {
              const { value: inputValue } = e.target;
              setInputValue(inputValue);
            }}
            addonAfter={addonAfter || ''}
            addonBefore={addonBefore || ''}
          />
        </div>
      );
    }
    case 'SINGLE': {
      return (
        <div className="filterSelectWrapper">
          <Select
            disabled={!!disabled}
            showSearch={showSearch}
            optionFilterProp="children"
            allowClear
            value={value}
            onChange={onChange}
            filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
            fieldNames={selectFieldNames}
            options={options}
          />
        </div>
      );
    }
    case 'SINGLE_API': {
      return (
        <div className="filterSelectWrapper">
          <Select
            disabled={!!disabled}
            showSearch
            allowClear
            onChange={onChange}
            onSearch={setInputValue}
            options={singleApiOptions}
            fieldNames={selectFieldNames}
          />
        </div>
      );
    }
    default:
      return null;
  }
};
