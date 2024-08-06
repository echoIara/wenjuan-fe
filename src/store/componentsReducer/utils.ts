import { ComponentInfoType, ComponentStateType } from "./index";

export function getNextSelectedId(
  componentList: ComponentInfoType[],
  selectedId: string
) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === selectedId);

  if (index < 0) return "";

  // 重新计算selectedId
  if (visibleComponentList.length <= 1) {
    // 只有一个组件
    return "";
  } else if (index === visibleComponentList.length - 1) {
    // 最后一个组件
    return visibleComponentList[index - 1].fe_id;
  } else {
    // 中间的组件
    return visibleComponentList[index + 1].fe_id;
  }
}

// 插入新组件
export function insertComponent(
  draft: ComponentStateType,
  newComponent: ComponentInfoType
) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((c) => c.fe_id === selectedId);

  if (index < 0) {
    // 未选中任何组件
    draft.componentList.push(newComponent);
  } else {
    // 选中了组件，插入到index后面
    draft.componentList.splice(index + 1, 0, newComponent);
  }

  draft.selectedId = newComponent.fe_id;
}
