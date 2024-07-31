// 问卷标题组件
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// Title 组件配置
export default {
    title: '标题',
    type: 'questionTitle',
    Component,
    PropComponent,
    defaultProps: QuestionTitleDefaultProps,
}