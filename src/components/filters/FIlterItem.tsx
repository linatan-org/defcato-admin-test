import React from 'react';
import { DatePicker, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import './styles.scss';

type FilterType = 'MULTI' | 'SINGLE' | 'DATE' | 'SWITCH' | 'SINGLE_DATE';

export interface IFilterItem {
  type: FilterType;
  key: string;
  name?: string;
  displayKey?: string;
  valueKey?: string;
  onChange?: (v: any) => void;
  value?: any;
}

const { RangePicker } = DatePicker;

export const FilterItem: React.FC<IFilterItem> = ({ type, onChange, value }) => {
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
    default:
      return null;
  }
};
