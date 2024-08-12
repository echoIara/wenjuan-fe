import { configureStore } from "@reduxjs/toolkit";
import undoable, { excludeAction, StateWithHistory } from "redux-undo"
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentStateType } from "./componentsReducer";
import pageInfoReducer, { pageInfoType } from "./pageInfoReducer";

export type StateType = {
	user: UserStateType
	//! 未使用undo
	// components: ComponentsStateType
	// 使用undo
	components: StateWithHistory<ComponentStateType>
	pageInfo: pageInfoType
}

const store = configureStore({
	reducer: {
		// store.user
		user: userReducer,
		//! 未使用undo 组件列表
		// components: componentReducer,
		//! 使用undo
		components: undoable(componentsReducer, {
			filter: excludeAction([
				"components/resetComponents",
				"components/changeSelectedId",
				"components/selectNextComponent",
				"components/selectPrevComponent",
			]),
			limit: 20, // 最大记录数
			debug: true,
		}),
		// 页面信息
		pageInfo: pageInfoReducer,
	},
})
export type RootState = ReturnType<typeof store.getState>

export default store
