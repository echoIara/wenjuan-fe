import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Input } from "antd";
import { LIST_SEARCH_PARAM_KEY } from "../constant";

const { Search } = Input;

const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  //获取url参数，设置到input value
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(newVal);
  });

  function handleSearch(value: string) {
    // 跳转页面
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }

  return (
    <>
      <Search
        placeholder="输入关键字"
        allowClear
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ width: "260px" }}
      />
    </>
  );
};

export default ListSearch;
