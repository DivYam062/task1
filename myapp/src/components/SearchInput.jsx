import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchInput = ({ value, onChange }) => {
  return <Search placeholder="Search posts" value={value} onChange={onChange} />;
};

export default SearchInput;
