// 根据用户登录状态动态跳转页面
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetUserInfo from "./useGetUserInfo";
import { isLoginOrRegister, isNoNeedUserInfo, LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from "../router";

function useNavPage(waitingUserData: boolean) {
    const { username } = useGetUserInfo()
    const { pathname } = useLocation()
    const nav = useNavigate()

    useEffect(() => {
        if (waitingUserData) return

        //已经登录
        if (username) {
            if (isLoginOrRegister(pathname)) {
                nav(MANAGE_INDEX_PATHNAME)
            }
            return
        }

        // 未登录
        if (isNoNeedUserInfo(pathname)) {
            return
        } else {
            nav(LOGIN_PATHNAME)
        }
    }, [username, pathname])
}

export default useNavPage