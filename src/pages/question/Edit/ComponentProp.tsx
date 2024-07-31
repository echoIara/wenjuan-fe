import React, { FC } from "react";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentPropsType,
  getComponentConfByType,
} from "../../../components/QuestionComponents";
import { changeComponentProps } from "../../../store/componentsReducer";

const NoProp: FC = () => {
  return <div style={{ textAlign: "center" }}>无属性</div>;
};

const ComponentProp: FC = () => {
  const dispatch = useDispatch();

  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent === undefined) return <NoProp />;

  const { type, props } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf === undefined) return <NoProp />;

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  const { PropComponent } = componentConf;

  return <PropComponent {...props} onChange={changeProps} />;
};

export default ComponentProp;
