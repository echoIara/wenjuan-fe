import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  removeSelectedComponent,
  copyComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
} from "../store/componentsReducer";
import { ActionCreators as UndoActionCreators } from "redux-undo";

// 当前鼠标所在元素
function isActiveElement() {
  const activeElement = document.activeElement;

  // 光标没有 focus 到 input
  if (activeElement === document.body) return true;
  // 增加 dnd-kit
  if (activeElement?.matches('div[role="button"]')) return true;

  return false;
}

function useShortcutKey() {
  const dispatch = useDispatch();
  // 删除组件
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElement()) return;
    dispatch(removeSelectedComponent());
  });

  // 复制
  useKeyPress(["meta.c", "ctrl.c"], () => {
    if (!isActiveElement()) return;
    dispatch(copyComponent());
  });

  // 粘贴
  useKeyPress(["meta.v", "ctrl.v"], () => {
    if (!isActiveElement()) return;
    dispatch(pasteComponent());
  });

  // 选中上一个
  useKeyPress("uparrow", () => {
    if (!isActiveElement()) return;
    dispatch(selectPrevComponent());
  });

  // 选中下一个
  useKeyPress("downarrow", () => {
    if (!isActiveElement()) return;
    dispatch(selectNextComponent());
  });

  // 撤销
  useKeyPress(
    ["meta.z", "ctrl.z"],
    () => {
      if (!isActiveElement()) return;
      dispatch(UndoActionCreators.undo());
    },
    {
      exactMatch: true, // 严格匹配
    }
  );

  // 重做
  useKeyPress(["meta.shift.z", "ctrl.shift.z"], () => {
    if (!isActiveElement()) return;
    dispatch(UndoActionCreators.redo());
  });
}

export default useShortcutKey;
