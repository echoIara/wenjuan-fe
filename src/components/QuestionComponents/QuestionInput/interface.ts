export type QuestionInputPropsType = {
  title?: string;
  placeHolder?: string;
  onChange?: (newProps: QuestionInputPropsType) => void;
  disabled?: boolean;
};

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: "输入框标题",
  placeHolder: "请输入...",
};
