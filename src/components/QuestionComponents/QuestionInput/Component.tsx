import React, { FC } from "react";
import { QuestionInputPropsType, QuestionInputDefaultProps } from "./interface";
import { Typography, Input } from "antd";

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType
) => {
  const { title, placeHolder } = { ...QuestionInputDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong> {title}</Paragraph>
      <div>
        <Input placeholder={placeHolder}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;
