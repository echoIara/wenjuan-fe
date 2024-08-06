// 问卷输入框组件
import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionTextareaDefaultProps } from "./interface";

export * from "./interface";

export default {
  title: "多行输入",
  type: "questionTextarea",
  Component, // 画布显示
  PropComponent, // 修改属性
  defaultProps: QuestionTextareaDefaultProps,
};
