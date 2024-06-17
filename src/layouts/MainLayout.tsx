import React, { FC } from "react";
import UserInfo from "../components/UserInfo";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import Logo from "../components/Logo";
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;


const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content >
          <Outlet />
        </Content>
      </Layout>
      <Footer className={styles.footer}>my问卷 &copy;2024-present. Created by me</Footer>
    </Layout>
  );
};

export default MainLayout;
