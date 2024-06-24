import React, { FC, useState } from "react";
import { useTitle } from "ahooks";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import useLoadQuesListData from "../../hooks/useLoadQuesListData";
import styles from "./Common.module.scss";
import { Typography, Empty, Spin } from "antd";

const { Title } = Typography;

const Star: FC = () => {
  useTitle('my问卷 - 星标问卷')

  const { data = {}, loading } = useLoadQuesListData({ isStar: true })
  const { list = [], total = 0 } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>}
        {!loading && list.length === 0 && (
          <Empty description="暂无数据，快去创建问卷吧！" />
        )}
        {list.length > 0 &&
          list.map((item: any) => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item} />;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;
