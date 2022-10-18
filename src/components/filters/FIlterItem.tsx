import React, { useEffect, useState } from 'react';
import { DatePicker, Space, Input } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import './styles.scss';
import useDebounceValue from '../hooks/useDebounce';

type FilterType = 'MULTI' | 'SINGLE' | 'DATE' | 'SWITCH' | 'SINGLE_DATE' | 'INPUT';

export interface IFilterItem {
  type: FilterType;
  key: string;
  name?: string;
  displayKey?: string;
  valueKey?: string;
  onChange?: (v: any) => void;
  value?: any;
  addonAfter?: string;
  addonBefore?: string;
}

const { RangePicker } = DatePicker;

export const FilterItem: React.FC<IFilterItem> = ({ type, onChange, value, addonAfter, addonBefore }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInputValue = useDebounceValue<string>(inputValue, 700);
  useEffect(() => {
    if (type === 'INPUT' && debouncedInputValue && debouncedInputValue.length >= 3) {
      onChange && onChange(inputValue);
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    if (type === 'INPUT' && inputValue === '') {
      onChange && onChange(inputValue);
    }
  }, [inputValue]);

  switch (type) {
    case 'DATE': {
      return (
        <div className="datepickerWrapRangePicker">
          <RangePicker
            className="datePickerRangePicker"
            value={value || null}
            format={'DD/MM/yyyy'}
            suffixIcon={<CalendarOutlined className="datePicker_icon" />}
            onChange={(v, s) => {
              const FromDate = s[0];
              const ToDate = s[1];
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
    default:
      return null;
  }
};
