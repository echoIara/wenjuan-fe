import React, { FC } from "react";
import { Typography } from "antd";
import { QuestionInfoPropsType, defaultQuestionInfoProps } from "./interface";

const { Title, Paragraph } = Typography;

const QuestionInfo: FC = (props: QuestionInfoPropsType) => {
  const { title, desc = "" } = { ...defaultQuestionInfoProps, ...props };

  const textList = desc.split("\n");

  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }}>{title}</Title>
      <Paragraph>
        {textList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default QuestionInfo;
