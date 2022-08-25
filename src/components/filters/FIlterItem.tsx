import React from 'react';
import { DatePicker, Space } from 'antd';

type FilterType = 'MULTI' | 'SINGLE' | 'DATE' | 'SWITCH' | 'SINGLE_DATE';

export interface IFilterItem {
  type: FilterType;
  key: string;
  name?: string;
  displayKey?: string;
  valueKey?: string;
  onChange?: (v: any) => void;
}

const { RangePicker } = DatePicker;

export const FilterItem: React.FC<IFilterItem> = ({ type, onChange }) => {
  switch (type) {
    case 'DATE': {
      return (
        <RangePicker
          format={'DD/MM/yyyy'}
          onChange={(v, s) => {
            const FromDate = s[0];
            const ToDate = s[1];
            onChange && onChange({ FromDate, ToDate });
          }}
        />
      );
    }
    default:
      return null;
  }
};
