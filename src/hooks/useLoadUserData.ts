import { useState, useEffect } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { getUserInfoService } from "../sevices/user";
import { loginReducer } from "../store/userReducer";

function useLoadUserData() {
    const dispatch = useDispatch()

    // 是否加载完成状态
    const [waitingUserData, setWaitingUserData] = useState(true)

    //ajax 加载用户信息
    const { run } = useRequest(getUserInfoService, {
        manual: true,
        onSuccess(result) {
            const { username, nickname } = result
            // 存储到 redux store
            dispatch(loginReducer({ username, nickname }))
        },
        onFinally() {
            setWaitingUserData(false)
        }
    })

    // 判断当前 redux store 是否已经存在用户信息
    const { username } = useGetUserInfo()
    useEffect(() => {
        if (username) {
            setWaitingUserData(false) //如果 redux 已经有用户信息就不发起新请求
            return
        }
        run() // 如果 redux store 没有用户信息，则进行加载
    }, [username])


    return { waitingUserData }
}

export default useLoadUserData