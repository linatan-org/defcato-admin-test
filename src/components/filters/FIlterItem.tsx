import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Input, Typography, InputNumber } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import './styles.scss';
import useDebounceValue from '../hooks/useDebounce';
const { Text } = Typography;

// eslint-disable-next-line
type FilterType = 'MULTI' | 'SINGLE' | 'SINGLE_API' | 'DATE' | 'MONTH_DATE' | 'SWITCH' | 'SINGLE_DATE' | 'INPUT' | 'INPUT_NUMBER';

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
  searchKeys?: string[];
  datesKeys?: { FromKey: string; ToKey: string };
  dateFormat?: string;
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
  searchKeys,
  defaultValue,
  datesKeys,
  dateFormat
}) => {
  const [inputValue, setInputValue] = useState<string>('');
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
    if (type === 'INPUT_NUMBER' && (debouncedInputValue || +debouncedInputValue === 0)) {
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
  }, [inputValue]);

  const getSingleApiOptions = async (search: string) => {
    if (getItems) {
      const items = await getItems(search);
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
            format={dateFormat || 'DD/MM/yyyy'}
            suffixIcon={<CalendarOutlined className="datePicker_icon" />}
            onChange={(v, s) => {
              if (onChange) {
                const FromDate = s[0] || undefined;
                const ToDate = s[1] || undefined;
                if (datesKeys) {
                  const fromKey = datesKeys.FromKey;
                  const ToKey = datesKeys.ToKey;
                  onChange({ [fromKey]: FromDate, [ToKey]: ToDate });
                  return;
                }
                onChange({ FromDate, ToDate });
              }
            }}
          />
        </div>
      );
    }
    case 'MONTH_DATE': {
      return (
        <div className="datepickerWrapRangePicker">
          <DatePicker
            disabled={!!disabled}
            className="datePickerRangePicker w-full"
            // value={!value ? null : value}
            format={dateFormat || 'MM/yyyy'}
            picker="month"
            defaultValue={defaultValue || null}
            suffixIcon={<CalendarOutlined className="datePicker_icon" />}
            onChange={(v, s) => {
              console.log(s, 'VALUE');
              if (onChange) {
                onChange(s);
              }
            }}
          />
        </div>
      );
    }
    case 'INPUT': {
      return (
        <div className="inputWrapper">
          <Input
            disabled={!!disabled}
            className="inputContainer"
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
            filterOption={(input, option) => {
              const matchedValue = searchKeys && searchKeys.map((key) => option[key]);
              return ((matchedValue && matchedValue[0]) || '').toLowerCase().includes(input.toLowerCase());
            }}
            fieldNames={selectFieldNames}
            options={options}
          />
        </div>
      );
    }
    case 'MULTI': {
      return (
        <div className="filterSelectWrapper">
          <Select
            mode="multiple"
            maxTagCount="responsive"
            disabled={!!disabled}
            showSearch={showSearch}
            optionFilterProp="children"
            allowClear
            value={value}
            onChange={onChange}
            filterOption={(input, option) => {
              const matchedValue = searchKeys && searchKeys.map((key) => option[key]);
              return ((matchedValue && matchedValue[0]) || '').toLowerCase().includes(input.toLowerCase());
            }}
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
    case 'INPUT_NUMBER': {
      return (
        <div className="inputNumberWrapper">
          <InputNumber
            type="number"
            disabled={!!disabled}
            className="inputNumberContainer"
            value={inputValue || value || ''}
            onChange={(value) => {
              setInputValue(value);
            }}
            addonAfter={addonAfter || ''}
            addonBefore={addonBefore || ''}
          />
        </div>
      );
    }
    default:
      return null;
  }
};
