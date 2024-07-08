import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { removeToken } from "../utils/user-token";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { logoutReducer } from "../store/userReducer";

const UserInfo: FC = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const { username, nickname } = useGetUserInfo()

    function logout() {
        dispatch(logoutReducer()) // 清空 redux user数据
        removeToken() // 清除 token
        nav(LOGIN_PATHNAME)
    }

    const UserInfo = (
        <>
            <span style={{ color: '#e8e8e8' }}>
                <UserOutlined />
                {nickname}
            </span>
            <Button type="link" onClick={logout}>退出</Button>
        </>
    )

    const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

    return (
        <div>
            {username ? UserInfo : Login}
        </div>
    )
}

export default UserInfo