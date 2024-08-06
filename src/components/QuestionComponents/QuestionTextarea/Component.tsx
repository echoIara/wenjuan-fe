import React, { FC } from "react";
import { QuestionTextareaPropsType, QuestionTextareaDefaultProps } from "./interface";
import { Typography, Input } from "antd";

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextarea: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType
) => {
  const { title, placeHolder } = { ...QuestionTextareaDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong> {title}</Paragraph>
      <div>
        <TextArea placeholder={placeHolder}></TextArea>
      </div>
    </div>
  );
};

export default QuestionTextarea;
