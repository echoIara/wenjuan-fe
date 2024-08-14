// 问卷 checkbox 组件

import Component from "./Component";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";
import { QuestionCheckboxDefaultProps } from "./interface";

export * from "./interface";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "多选",
  type: "questionCheckbox",
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
};
