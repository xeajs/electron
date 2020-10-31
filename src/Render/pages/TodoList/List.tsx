import { Table, Tag } from 'antd';

import React from 'react';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();

  return (
    <Table
      pagination={false}
      dataSource={[
        {
          key: '1',
          firstName: 'John',
          lastName: 'Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          key: '2',
          firstName: 'Jim',
          lastName: 'Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser']
        },
        {
          key: '3',
          firstName: 'Joe',
          lastName: 'Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ]}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          render() {
            return 987;
          }
        },
        {
          title: 'Name',
          dataIndex: 'name',
          render() {
            return 987;
          }
        },
        {
          title: 'Name',
          dataIndex: 'name',
          render() {
            return 987;
          }
        },
        {
          title: 'Name',
          dataIndex: 'name',
          render() {
            return (
              <Tag
                onClick={() => {
                  history.push('/todo/info');
                }}
              >
                查看详情
              </Tag>
            );
          }
        }
      ]}
    ></Table>
  );
};

export default Wrap;
