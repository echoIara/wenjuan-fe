import React, { FC } from "react";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import {
  componentConfigGroup,
  ComponentConfType,
} from "../../../components/QuestionComponents";
import { addComponent } from "../../../store/componentsReducer";
import styles from "./ComponentLib.module.scss";

const { Title } = Typography;

function GetComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c;
  const dispatch = useDispatch();

  // 点击添加组件到画布，并且选中该组件
  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    );
  }

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfigGroup.map((group, index) => {
        const { groupId, groupName, components } = group;

        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : "0" }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => GetComponent(c))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
