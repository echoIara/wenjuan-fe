import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const nav = useNavigate();
  return (
    <div>
      <p>Home</p>
      <div>
        <button
          onClick={() => {
            nav("/login");
          }}
        >
          登录
        </button>
      </div>
    </div>
  );
};

export default Home;
