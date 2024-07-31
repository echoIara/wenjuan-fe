import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";

// 统一，各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType;

// 统一，组件配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// 全部组件配置的列表
const componentConfigList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
];

// 组件分组
export const componentConfigGroup = [
  {
    groupId: "text",
    groupName: "文本显示",
    components: [QuestionTitleConf],
  },
  {
    groupId: "input",
    groupName: "用户输入",
    components: [QuestionInputConf],
  },
];

// 根据类型获取组件配置
export function getComponentConfByType(type: string) {
  return componentConfigList.find((item) => item.type === type);
}
