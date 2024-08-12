import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { getQuestionService } from "../sevices/question";
import { resetComponents } from "../store/componentsReducer";
import { resetPageInfo } from "../store/pageInfoReducer";

function useLoadQuesData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();

  // ajax 加载
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("id is required");
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    }
  );

  // 根据获取的 data 设置 rudex store
  useEffect(() => {
    if (!data) return;

    const {
      title = "",
      desc = "",
      js = "",
      css = "",
      componentList = [],
    } = data;

    // 获取默认的selectedId
    let selectedId = "";
    selectedId = componentList.length > 0 ? componentList[0].fe_id : "";

    // 把 componentList 存储到 redux store 中
    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null })
    );

    // 把 pageInfo 存储到 redux store 中
    dispatch(resetPageInfo({ title, desc, js, css }));
    
  }, [data]);

  // 判断 id 变化，执行 ajax 加载问卷数据
  useEffect(() => {
    run(id);
  }, [id]);

  return {
    loading,
    error,
  };
}

export default useLoadQuesData;
