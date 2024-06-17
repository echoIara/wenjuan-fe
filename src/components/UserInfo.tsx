import React, { FC } from "react";
import { Link } from "react-router-dom";
import { LOGN_PATHNAME } from "../router";

const UserInfo: FC = () => {
    return (
        <>
            <Link to={LOGN_PATHNAME}>登录</Link>
        </>
    )
}

export default UserInfo