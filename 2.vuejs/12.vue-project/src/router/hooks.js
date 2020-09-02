import store from '../store'
import * as types from '../store/action-types'
const whiteList = ['/reg']

export default {
  // 名字是给用户看的
  'cancelToken'(to, from, next) {
    console.log(store.state.ajaxTokens)
    store.state.ajaxTokens.forEach(fn => fn())
    store.commit(types.SET_REQUEST_TOKEN, 'clear')
    next()
  },
  async  'loginPermission'(to, from, next) {
    // 返回的结果 还是要存放到 vuex 中
    // whiteList 白名单
    if (whiteList.includes(to.path)) {
      return next()
    }
    await store.dispatch('user/' + types.SET_USER_VALIDATE)

    if (store.state.user.hasPermission) {
      if (to.path === '/login') {
        next('/') // 如果去的页面是 login 直接会回到首页
      } else {
        next()
      }
    } else {
      let needLogin = to.matched.some(item => item.meta.needLogin)
      if (needLogin) {
        next('/login')
      } else {
        next()
      }
    }
  },
  async 'menuPermission'(to, from, next) {
    if (store.state.user.hasPermission) {
      // 是否添加过路由了

      // 如果已经添加过了 那应该也往下走了
      if (!store.state.user.menuPermission) {
        // 获取最新路由权限 根据用户权限来获取
        store.dispatch('user/' + types.SET_ROUTE) // 添加路由
        // 页面加载完毕后才能走 -> 相当于一直无限循环自己
        // next({ ...to, replace: true }) // hack
      } else {
        //  已经获取过菜单权限了
        next()
      }
    } else {
      next()
    }
  }
}