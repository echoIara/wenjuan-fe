import React, { FC, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./Common.module.scss";
import { Typography, Empty, Table, Tag, Space, Button, Modal, message } from "antd";
import { title } from "process";
import { render } from "@testing-library/react";
import { useTitle } from "ahooks";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography

const {confirm} = Modal

const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: "3月10日 13:23",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: "3月15日 14:23",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: true,
    answerCount: 6,
    createAt: "3月10日 13:43",
  },
];

const Trash: FC = () => {
  useTitle('my问卷 - 回收站')

  const [questionList, setQuestionList] = useState(rawQuestionList);

  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      }
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
    },
  ]

  function del(){
    confirm({
      title:'确认删除？',
      icon:<ExclamationCircleOutlined />,
      content:'删除后不可以找回',
      onOk:()=>message.success('删除成功')
    })
  }

  const TableElem = <>
    <div style={{ marginBottom: '16px' }}>
      <Space>
        <Button type="primary" disabled={selectedIds.length === 0}>恢复</Button>
        <Button type="dashed" danger disabled={selectedIds.length === 0} onClick={del}>删除</Button>
      </Space>
    </div>
    <Table
      dataSource={questionList}
      columns={tableColumns}
      pagination={false}
      rowKey={q => q._id}
      rowSelection={{
        type: 'checkbox',
        onChange: (selectedRowKeys) => { setSelectedIds(selectedRowKeys as string[]) },
      }}
    />
  </>


  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>（搜索）</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description='回收站什么都没有...' />}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
};

export default Trash;
