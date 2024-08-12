import React, { FC, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from "../../../store/componentsReducer";
import useShortcutKey from "../../../hooks/useShortcutKey";
import { Spin } from "antd";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";
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
  useShortcutKey();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }

  //拖拽组件需要id 属性,
  const componentListId = componentList.map((c) => ({ ...c, id: c.fe_id }));

  //处理拖拽后的事件
  function handleDragEnd(newIndex: number, oldIndex: number) {
    dispatch(moveComponent({ newIndex, oldIndex }));
  }

  return (
    <SortableContainer items={componentListId} onDragEnd={handleDragEnd}>
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
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={(e) => handleClick(e, fe_id)}
                >
                  <div className={styles.component}>{getComponent(c)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
