import React, { FC, useMemo, useRef } from "react";
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import QRCode from "qrcode.react";
import {
  Space,
  Button,
  Typography,
  Input,
  Tooltip,
  Popover,
  message,
  type InputRef,
} from "antd";
import styles from "./StatHeader.module.scss";

const StatHeader: FC = () => {
  const nav = useNavigate();
  const urlInputRef = useRef<InputRef>(null);

  const { title, isPublished } = useGetPageInfo();
  const { id } = useParams();

  //拷贝连接
  function copy() {
    const elem = urlInputRef.current;
    if (elem === null) return;
    elem.select();
    document.execCommand("copy"); //拷贝选中内容
    message.success("链接已拷贝 " + elem.input?.value);
  }

  // 获取链接和二维码
  const getLinkAndQRcodeEle = useMemo(() => {
    if (!isPublished) return null;

    //拼接url
    const url = `${window.location.origin}/question/${id}`;

    //定义二维码组件
    const QRcodeEle = (
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <div>
        <Space>
          <Input ref={urlInputRef} value={url} style={{ width: "300px" }} />
          <Tooltip title="拷贝拦截">
            <Button onClick={copy} icon={<CopyOutlined />} />
          </Tooltip>
          <Popover content={QRcodeEle} placement="bottom">
            <Button icon={<QrcodeOutlined />}></Button>
          </Popover>
        </Space>
      </div>
    );
  }, [id, isPublished]);

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button onClick={() => nav(-1)} type="link" icon={<LeftOutlined />}>
              返回
            </Button>
            <Typography.Title>{title}</Typography.Title>
          </Space>
        </div>
        <div className={styles.main}>{getLinkAndQRcodeEle}</div>
        <div className={styles.right}>
          <Button onClick={() => nav("/question/edit/" + id)} type="primary">
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
