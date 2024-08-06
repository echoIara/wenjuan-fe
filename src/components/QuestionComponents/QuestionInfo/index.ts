// 问卷 info 组件

import Component from "./Component";
import PropComponent from "./PropComponent";
import { defaultQuestionInfoProps } from "./interface";

export * from "./interface";

export default {
  title: "问卷信息",
  type: "questionInfo",
  Component,
  PropComponent,
  defaultProps: defaultQuestionInfoProps,
};
