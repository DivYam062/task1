import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const MultiSelectFilter = ({ options, value, onChange }) => {
  return (
    <Select
      mode="multiple"
      placeholder="Select tags"
      value={value}
      onChange={onChange}
      style={{ width: '100%' }}
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default MultiSelectFilter;
