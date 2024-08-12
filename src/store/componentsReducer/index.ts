// 存贮组件列表的数据
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { produce } from "immer";
import { arrayMove } from "@dnd-kit/sortable";
import cloneDeep from "lodash.clonedeep";
import { getNextSelectedId, insertComponent } from "./utils";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: ComponentInfoType[];
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
};

export const componentSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentStateType,
      action: PayloadAction<ComponentStateType>
    ) => {
      return action.payload;
    },

    // 选中组件
    changeSelectedId: produce(
      (draft: ComponentStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload;
      }
    ),

    // 添加新组件
    addComponent: produce(
      (draft: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload;

        insertComponent(draft, newComponent);
      }
    ),

    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload;

        // 当前要修改属性的组件
        const curComp = draft.componentList.find(
          (item) => item.fe_id === fe_id
        );

        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          };
        }
      }
    ),

    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const index = componentList.findIndex((c) => c.fe_id === selectedId);

      // 重新计算selectedId
      const newSelectedId = getNextSelectedId(componentList, selectedId);
      draft.selectedId = newSelectedId;

      if (index >= 0) {
        // 删除选中的组件
        draft.componentList.splice(index, 1);
      }
    }),

    // 隐藏/显示组件
    hideComponent: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>
      ) => {
        const { componentList = [] } = draft;
        const { fe_id, isHidden } = action.payload;

        // 重新计算selectedId
        const newSelectedId = isHidden
          ? getNextSelectedId(componentList, fe_id) // 隐藏
          : fe_id; // 显示

        draft.selectedId = newSelectedId;

        const curComp = componentList.find((c) => c.fe_id === fe_id);

        if (curComp) {
          curComp.isHidden = isHidden;
        }
      }
    ),

    // 锁定/解锁组件
    toggleLockComponent: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload;
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);

        if (curComp) {
          curComp.isLocked = !curComp.isLocked;
        }
      }
    ),

    // 复制组件
    copyComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const curComp = componentList.find((c) => c.fe_id === selectedId);

      if (curComp) {
        draft.copiedComponent = cloneDeep(curComp);
      }
    }),

    // 粘贴组件
    pasteComponent: produce((draft: ComponentStateType) => {
      const { copiedComponent } = draft;
      if (copiedComponent == null) return;

      // 要修改 fe_id
      copiedComponent.fe_id = nanoid();

      insertComponent(draft, copiedComponent);
    }),

    // 选中上一个
    selectPrevComponent: produce((draft: ComponentStateType) => {
      const { componentList = [], selectedId } = draft;
      const index = componentList.findIndex((c) => c.fe_id === selectedId);

      if (index < 0) return; // 未选中组件

      if (index === 0) return; // 第一个组件

      draft.selectedId = componentList[index - 1].fe_id;
    }),

    // 选中下一个
    selectNextComponent: produce((draft: ComponentStateType) => {
      const { componentList = [], selectedId } = draft;
      const index = componentList.findIndex((c) => c.fe_id === selectedId);

      if (index < 0) return; // 未选中组件

      if (index === componentList.length - 1) return; // 最后一个组件

      draft.selectedId = componentList[index + 1].fe_id;
    }),

    // 修改标题
    changeComponentTitle: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; title: string }>
      ) => {
        const { fe_id, title } = action.payload;
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);

        if (curComp) {
          curComp.title = title;
        }
      }
    ),

    // 移动组件位置
    moveComponent: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: curComp } = draft;
        const { oldIndex, newIndex } = action.payload;

        draft.componentList = arrayMove(curComp, oldIndex, newIndex);
      }
    ),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  hideComponent,
  toggleLockComponent,
  copyComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentSlice.actions;

export default componentSlice.reducer;
