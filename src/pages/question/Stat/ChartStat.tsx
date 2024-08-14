import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { Typography } from "antd";
import { getComponentStatService } from "../../../sevices/stat";
import { getComponentConfByType } from "../../../components/QuestionComponents";

type PropsType = {
  selectedComponentType: string;
  selectedComponentId: string;
};

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentType, selectedComponentId } = props;
  const { id = "" } = useParams();
  const [statData, setStatData] = useState<Array<any>>([]);

  const { run } = useRequest(
    async (questionId, componentId) =>
      await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess: (data) => {
        setStatData(data.stat);
      },
    }
  );

  //监听id
  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId);
  }, [id, selectedComponentId, run]);

  //生成统计组件
  function getStatElem() {
    if (!selectedComponentId) return <div>请选择组件</div>;
    const { StatComponent } =
      getComponentConfByType(selectedComponentType) || {};
    if (!StatComponent) return <div>该组件无统计组件</div>;
    return <StatComponent stat={statData} />;
  }

  return (
    <>
      <Typography.Title level={4}>图标统计</Typography.Title>
      <div>{getStatElem()}</div>
    </>
  );
};

export default ChartStat;
