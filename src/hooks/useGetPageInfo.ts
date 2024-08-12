import { useSelector } from "react-redux"
import type { StateType } from "../store"
import type { pageInfoType } from "../store/pageInfoReducer"

function useGetPageInfo() {
	const pageInfo = useSelector<StateType>(state => state.pageInfo) as pageInfoType
	return pageInfo
}

export default useGetPageInfo