


export let _Vue;
export default function install(Vue, options) {
  // 插件安装的入口
  console.log(options)

  _Vue = Vue; // 这样，别的文件都可以使用 Vue 变量

  // 给所有组件都混入一个属性 router
  Vue.mixin({
    beforeCreate() {
      // 把父亲传入的 router 实例共享给所有的子组件
      // console.log('---')
      if (this.$options.router) {
        this._routerRoot = this // 我给当前根组件增加一个属性 代表的是他自己
        this._router = this.$options.router
        this._router.init(this)
        // console.log('父亲', this.$options.name)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
        // console.log('儿子', this.$options.name)
      }
      //  无论是父组件还是子组件 都可以通过 this._routerRoot._router 获取共同的实例

    },
  })


  // 插件一般用于定义全局组件 全局制定 过滤器 原型方法...
  Vue.component('router-link', {
    render: h => h('a', {}, '')
  })

  Vue.component('router-view', {
    render: h => h('div', {}, '')
  })


  Vue.prototype.$route = {}
  Vue.prototype.$router = {}
}