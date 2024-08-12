import React, { FC, useState, ChangeEvent } from "react";
import { Button, Space, Typography, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRequest, useKeyPress, useDebounceEffect } from "ahooks";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { changePageTitle } from "../../../store/pageInfoReducer";
import { updateQuestionService } from "../../../sevices/question";
import styles from "./EditHeader.module.scss";

const { Title } = Typography;

// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
  }

  if (edit) {
    return (
      <Input
        value={title}
        onChange={handleChangeTitle}
        onPressEnter={(e) => setEdit(false)}
        onBlur={() => setEdit(false)}
      />
    );
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => setEdit(true)}
      />
    </Space>
  );
};

// 保存按钮
const SaveButton: FC = () => {
  //需要保存的 pageInfo 和 componentList
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const { id } = useParams();

  const { run: save, loading } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
      });
    },
    {
      manual: true,
    }
  );

  //快捷键
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });

  //自动保存 不是定期保存 防抖
  useDebounceEffect(
    () => {
      save();
    },
    [pageInfo, componentList],
    {
      wait: 1000,
    }
  );
  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  );
};

// 发布按钮
const PublishButton: FC = () => {
  // 更新 isPublished
  const nav = useNavigate();
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { run: publish, loading } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success("发布成功");
        nav("/question/stat/" + id); //调整到统计页面
      },
    }
  );
  return (
    <Button
      type="primary"
      onClick={publish}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      发布
    </Button>
  );
};

// 编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
