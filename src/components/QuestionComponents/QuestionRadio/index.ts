// 问卷 radio 组件

import Component from "./Component";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";
import { QuestionRadioDefaultProps } from "./interface";

export * from "./interface";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "单选",
  type: "questionRadio",
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent,
};
