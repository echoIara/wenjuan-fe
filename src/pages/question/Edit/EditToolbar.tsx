import React, { FC } from "react";
import { Button, Space, Tooltip } from "antd";
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  hideComponent,
  removeSelectedComponent,
  toggleLockComponent,
  copyComponent,
  pasteComponent,
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent } =
    useGetComponentInfo();
  const { isLocked } = selectedComponent || {};

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
    </Space>
  );
};

export default EditToolbar;
