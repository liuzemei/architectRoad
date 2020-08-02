import { initState } from "./state"

export function initMixin(Vue) {

  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options

    // 初始化状态（将数据做一个初始化的劫持 当我改变数据时应该更新视图）
    // vue 组件中有很多状态 data props watch computed
    initState(vm)



    // vue 里边核心特性 响应式数据源里
    // Vue 是一个什么样的框架 MVVM
    // 数据变化视图会更新，视图变化数据会被影响（MVVM: 不能跳过数据区更新视图，但是Vue没有遵循MVVM，$ref）

  }
}