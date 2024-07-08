import React, { FC } from "react";
import UserInfo from "../components/UserInfo";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import Logo from "../components/Logo";
import { Layout, Spin } from 'antd';
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";

const { Header, Footer, Content } = Layout;


const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

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
          {!waitingUserData ? <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div> : <Outlet />}
        </Content>
      </Layout>
      <Footer className={styles.footer}>my问卷 &copy;2024-present. Created by me</Footer>
    </Layout>
  );
};

export default MainLayout;
