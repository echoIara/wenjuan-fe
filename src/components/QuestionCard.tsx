import React, { FC } from "react";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LineChartOutlined, StarOutlined } from "@ant-design/icons";
import styles from "./QuestionCard.module.scss";
import { useNavigate, Link } from "react-router-dom";

type PropsType = {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createAt: string;
};
const { confirm } = Modal

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, createAt, answerCount, isPublished, isStar } = props;

  function duplicate() {
    message.success('复制成功！')
  }

  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: () => message.success('删除成功')
    })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {isStar && <StarOutlined style={{ color: 'red' }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? (
                <Tag color="processing" style={{ color: "green" }}>已发布</Tag>
              ) : (
                <Tag>未发布</Tag>
              )}
              <span>答卷:{answerCount}</span>
              {createAt}
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '12px 0' }} />
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Space>
              <Button icon={<EditOutlined />} type="text" size="small" onClick={() => nav(`/question/edit/${_id}`)}>编辑问卷</Button>
              <Button icon={<LineChartOutlined />} type="text" size="small" onClick={() => nav(`/question/stat/${_id}`)} disabled={!isPublished}>数据统计</Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button type="text" icon={<StarOutlined />} size="small">
                {isStar ? '取消收藏' : '收藏'}
              </Button>
              <Popconfirm
                title='确定复制？'
                okText='确定'
                cancelText='取消'
                onConfirm={duplicate}
              >
                <Button type="text" icon={<CopyOutlined />} size="small">
                  复制
                </Button>
              </Popconfirm>
              <Button type="text" icon={<DeleteOutlined />} size="small" onClick={del}>
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
