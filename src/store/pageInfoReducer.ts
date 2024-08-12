import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";

export type pageInfoType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
};

const INIT_STATE: pageInfoType = {
  title: "",
  desc: "",
  js: "",
  css: "",
};

const pageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (
      state: pageInfoType,
      action: PayloadAction<pageInfoType>
    ) => {
      return action.payload;
    },
    // 修改标题
    changePageTitle: produce(
      (draft: pageInfoType, action: PayloadAction<string>) => {
        draft.title = action.payload;
      }
    ),
  },
});

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
