export type QuestionTextareaPropsType = {
  title?: string;
  placeHolder?: string;
  onChange?: (newProps: QuestionTextareaPropsType) => void;
  disabled?: boolean;
};

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: "输入框标题",
  placeHolder: "请输入...",
};
