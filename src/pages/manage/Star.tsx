import React, { FC, useState } from "react";
import { useTitle } from "ahooks";
import QuestionCard from "../../components/QuestionCard";
import styles from "./Common.module.scss";
import { Typography, Empty } from "antd";

const { Title } = Typography

const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: "3月10日 13:23",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: true,
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

const Star: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>（搜索）</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description='暂无数据，快去创建问卷吧！' />}
        {questionList.length > 0 && questionList.map((item) => {
          const { _id } = item;
          return <QuestionCard key={_id} {...item} />;
        })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
};

export default Star;
