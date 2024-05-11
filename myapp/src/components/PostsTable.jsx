import React from 'react';
import { Table } from 'antd';

const PostsTable = ({ dataSource, columns, pagination, loading, onChange }) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={pagination}
      loading={loading}
      onChange={onChange}
    />
  );
};

export default PostsTable;