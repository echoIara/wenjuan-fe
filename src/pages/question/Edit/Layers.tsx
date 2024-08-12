import React, { useState, FC, ChangeEvent } from "react";
import classnames from "classnames";
import { Input, message, Button, Space } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  changeSelectedId,
  changeComponentTitle,
  toggleLockComponent,
  hideComponent,
  moveComponent,
} from "../../../store/componentsReducer";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";
import styles from "./Layers.module.scss";

const Layers: FC = () => {
  const { componentList = [], selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  // 记录正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState("");

  // 处理点击事件
  function handleTitleClick(fe_id: string) {
    //判断是否是隐藏组件不能点击
    const curComp = componentList.find((c) => c.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.info("不能选择隐藏中的组件");
      return;
    }
    // 如果点击时当前组件的id 不等于选中的id, 改变selectedId
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId("");
      return;
    }

    //点击修改标题
    setChangingTitleId(fe_id);
  }

  //修改标题
  function changeSelectedTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;

    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }));
  }

  //切换 隐藏/显示
  function handleIsHidden(fe_id: string, isHidden: boolean) {
    dispatch(hideComponent({ fe_id, isHidden }));
  }

  //切换 锁定/解锁
  function handleIsLocked(fe_id: string) {
    dispatch(toggleLockComponent({ fe_id }));
  }

  //拖拽组件需要id 属性,
  const componentListId = componentList.map((c) => ({ ...c, id: c.fe_id }));

  //处理拖拽后的事件
  function handleDragEnd(newIndex: number, oldIndex: number) {
    dispatch(moveComponent({ newIndex, oldIndex }));
  }

  return (
    <SortableContainer items={componentListId} onDragEnd={handleDragEnd}>
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;
        // 拼接title className
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classnames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div
                className={titleClassName}
                onClick={() => handleTitleClick(fe_id)}
              >
                {fe_id === changingTitleId ? (
                  <Input
                    value={title}
                    onChange={changeSelectedTitle}
                    onPressEnter={() => setChangingTitleId("")}
                    onBlur={() => setChangingTitleId("")}
                  />
                ) : (
                  title
                )}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ""}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? "primary" : "text"}
                    onClick={() => handleIsHidden(fe_id, !isHidden)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ""}
                    icon={<LockOutlined />}
                    type={isLocked ? "primary" : "text"}
                    onClick={() => handleIsLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;
