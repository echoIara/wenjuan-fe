import axios, { ResDataType } from "./ajax"

//获取统计列表
export const getQuestionStatListService = async (
	questionId: string,
	opt: { page: number; pageSize: number }
): Promise<ResDataType> => {
	const url = `/api/stat/${questionId}`
	const data = (await axios.get(url, { params: opt })) as ResDataType
	return data
}

//获取组件汇总统计
export const getComponentStatService = async (
	questionId: string,
	componentId: string
): Promise<ResDataType> => {
	const url = `/api/stat/${questionId}/${componentId}`
	const data = (await axios.get(url)) as ResDataType
	return data
}