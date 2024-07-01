import React, { FC, useState } from "react";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message, Result } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LineChartOutlined, StarOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useRequest } from "ahooks";
import { updateQuestionService, duplicateQuestionService } from "../sevices/question";
import styles from "./QuestionCard.module.scss";

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

  // 修改收藏
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeLoading, run: changeStr } = useRequest(async () => {
    await updateQuestionService(_id, { isStar: !isStarState })
  }, {
    manual: true,
    onSuccess() {
      setIsStarState(!isStarState)
    }
  })

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(res) {
        message.success('复制成功！')
        nav(`/question/edit/${res.id}`)
      }
    })

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      }
    })

  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }

  // 已经删除的问卷，不渲染卡片
  if (isDeletedState) return null

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {isStarState && <StarOutlined style={{ color: 'red' }} />}
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
              <Button type="text" icon={<StarOutlined />} size="small" onClick={changeStr} disabled={changeLoading}>
                {isStarState ? '取消收藏' : '收藏'}
              </Button>
              <Popconfirm
                title='确定复制？'
                okText='确定'
                cancelText='取消'
                onConfirm={duplicate}
              >
                <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                  复制
                </Button>
              </Popconfirm>
              <Button type="text" icon={<DeleteOutlined />} size="small" onClick={del} disabled={deleteLoading}>
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
