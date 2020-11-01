import { Table, Tag } from 'antd';

import React from 'react';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();

  return (
    <Table
      pagination={false}
      rowKey={(record) => record._id}
      dataSource={[
        {
          _id: 'sdf',
          title: '阿斯扥',
          step: '已创建'
        },
        {
          _id: 'sdfsdf',
          title: 'gasf',
          step: '进行中'
        },
        {
          _id: 'sdfsdfgs',
          title: 'gasf',
          step: '已完成'
        }
      ]}
      columns={[
        {
          title: '项目',
          align: 'center',
          dataIndex: 'title'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'step',
          render(text, record) {
            switch (text) {
              case '已完成':
                return <Tag color="green">{text}</Tag>;
              case '进行中':
                return <Tag color="orange">{text}</Tag>;
              default:
                return <Tag color="">{text}</Tag>;
            }
          }
        },
        {
          title: '更多',
          align: 'center',
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
