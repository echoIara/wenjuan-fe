import React, { FC, useEffect, useState, useRef, useMemo } from "react";
import { useTitle, useDebounceFn, useRequest } from "ahooks";
import { useSearchParams } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import { getQuestionListService } from "../../sevices/question";
import styles from "./Common.module.scss";
import { Empty, Spin, Typography } from "antd";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";

const { Title } = Typography

const List: FC = () => {
  useTitle('my问卷 - 我的问卷')

  const [started, setStarted] = useState(false) // 是否已经开始加载
  const [page, setPage] = useState(1) // list 内部的数据，不在 url 参数中体现
  const [list, setList] = useState([]) // 全部的列表数据，上滑加载更多，累加
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length // 有更多数据

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  // keyword 变化时，重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  // 加载
  const { run: load, loading } = useRequest(async () => {
    const data = await getQuestionListService({
      page,
      pageSize: LIST_PAGE_SIZE,
      keyword,
    })
    return data
  }, {
    manual: true,
    onSuccess(result) {
      const { list: l = [], total = 0 } = result
      setList(list.concat(l))
      setTotal(total)
      setPage(page + 1)
    }
  })


  // 尝试触发加载 - 防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(() => {
    const elem = containerRef.current
    if (elem == null) return
    const domRect = elem.getBoundingClientRect()
    if (domRect == null) return
    const { bottom } = domRect
    if (bottom <= document.body.clientHeight) {
      load()
      console.log('加载数据');
      setStarted(true)
    }
  }, {
    wait: 1000,
  })

  // 当页面加载，或者 url 参数 (keyword) 变化时，触发加载
  useEffect(() => {
    tryLoadMore() // 加载第一页
  }, [searchParams])

  // 当页面滚动时
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  // loadingMore elem
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description='暂无数据' />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])

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
        {list.length > 0 && list.map((item: any) => {
          const { _id } = item;
          return <QuestionCard key={_id} {...item} />;
        })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>
          {LoadMoreContentElem}
        </div>
      </div>
    </>
  );
};

export default List;
