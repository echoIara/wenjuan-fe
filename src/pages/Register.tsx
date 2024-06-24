import React, { FC } from "react";
import { Space, Typography, Form, Input, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";
import { LOGIN_PATHNAME } from "../router";

const { Title } = Typography;

const Register: FC = () => {
  const onFinish = (values: any) => {};

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: "请输入用户名,长度在5-20之间" },
            { type: "string", min: 5, max: 20, message: "长度在5-20之间" },
            { pattern: /^\w+$/, message: "只能是字母数字下划线" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "请再次输入密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error("两次密码不一致"));
                }
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="昵称" name="nickname">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
            <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
