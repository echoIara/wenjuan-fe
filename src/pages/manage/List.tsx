import React, { FC } from "react";
import { useTitle } from "ahooks";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import useLoadQuesListData from "../../hooks/useLoadQuesListData";
import styles from "./Common.module.scss";
import { Spin, Typography } from "antd";

const { Title } = Typography

const List: FC = () => {
  useTitle('my问卷 - 我的问卷')

  const { data = {}, loading } = useLoadQuesListData()
  const { list = [], total = 0 } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>}
        {!loading && list.length > 0 && list.map((item: any) => {
          const { _id } = item;
          return <QuestionCard key={_id} {...item} />;
        })}
      </div>
      <div className={styles.footer}>loadMore 上滑加载更多。。。</div>
    </>
  );
};

export default List;
