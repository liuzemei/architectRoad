import { initState } from "./state"
import { compileToFunctions } from "./compiler/index"

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


    // 如果当前有 el 属性，说明要渲染模板
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    // 挂载操作
    const vm = this
    const opts = vm.$options
    el = document.querySelector(el)


    if (!opts.render) {
      // 没 render
      let template = opts.template
      if (!template && el) {
        template = el.outerHTML
      }
      const render = compileToFunctions(template)
      opts.render = render
    }
  }
}