import React, { FC } from "react";
import { Button, Space, Tooltip } from "antd";
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { useDispatch } from "react-redux";
import {
  hideComponent,
  removeSelectedComponent,
  toggleLockComponent,
  copyComponent,
  pasteComponent,
  moveComponent,
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, componentList, copiedComponent } =
    useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const length = componentList.length;
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
  const isFirst = selectedIndex <= 0;
  const isLast = selectedIndex >= length - 1; // 最后一个

  // 删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }
  // 隐藏组件
  function handleHidden() {
    dispatch(hideComponent({ fe_id: selectedId, isHidden: true }));
  }

  // 锁定组件
  function handleLock() {
    dispatch(toggleLockComponent({ fe_id: selectedId }));
  }

  // 复制组件
  function handleCopy() {
    dispatch(copyComponent());
  }

  // 粘贴组件
  function handlePaste() {
    dispatch(pasteComponent());
  }

  // 上移组件
  function handleUp() {
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 })
    );
  }

  // 下移组件
  function handleDown() {
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 })
    );
  }

  // 撤销
  function handleUndo() {
    dispatch(UndoActionCreators.undo());
  }

  // 重做
  function handleRedo() {
    dispatch(UndoActionCreators.redo());
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? "primary" : "default"}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={handleCopy}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={!copiedComponent}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={handleUp}
          disabled={isFirst}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={handleDown}
          disabled={isLast}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button
          shape="circle"
          icon={<UndoOutlined />}
          onClick={handleUndo}
        ></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button
          shape="circle"
          icon={<RedoOutlined />}
          onClick={handleRedo}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
