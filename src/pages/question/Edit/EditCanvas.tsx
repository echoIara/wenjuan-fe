import React, { FC, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import {
  ComponentInfoType,
  changeSelectedId,
} from "../../../store/componentsReducer";
import useShortcutKey from "../../../hooks/useShortcutKey";
import { Spin } from "antd";
import styles from "./EditCanvas.module.scss";

type PropsType = {
  loading: boolean;
};

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);

  if (componentConf == null) return null;

  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();

  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation(); // 阻止冒泡
    dispatch(changeSelectedId(id));
  }

  // 绑定快捷键
  useShortcutKey()

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, isLocked } = c;

          // 拼接class name
          const wrapperDefaultClassName = styles["component-wrapper"];
          const selectClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectClassName]: selectedId === fe_id,
            [lockedClassName]: isLocked,
          });

          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={(e) => handleClick(e, fe_id)}
            >
              <div className={styles.component}>{getComponent(c)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default EditCanvas;
