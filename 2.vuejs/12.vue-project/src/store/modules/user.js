import * as types from "../action-types";
import * as api from "../..//api/user";
import { setLocal, getLocal } from '../../utils/local'
import router from "../../router";

export default {
  state: {
    userInfo: {}, // 存储用户数据
    hasPermission: false,
    menuPermission: false, // 默认没有处理菜单
  },
  mutations: {
    // 设置用户信息
    [types.SET_USER](state, userInfo) {
      state.userInfo = userInfo;
      if (userInfo && userInfo.token) {
        setLocal('token', userInfo.token)
      }
    },
    [types.SET_PERMISSION](state, has) {
      state.hasPermission = has
    },
    [types.SET_MENU_PERMISSION](state, has) {
      state.menuPermission = has
    }
  },
  actions: {
    async [types.SET_USER_LOGIN]({ commit }, options) {
      // 调用登录接口
      try {
        let userInfo = await api.login(options);
        // 存储登录信息
        commit(types.SET_USER, userInfo);
        commit(types.SET_PERMISSION, true)
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async [types.SET_USER_VALIDATE]({ commit }) {
      // 1. 先看一下用户有没有登录
      if (!getLocal('token')) return false
      // 2. 
      try {
        let result = await api.validate() // 会调用 ajax 请求，会携带 token 后端会验证 token 是否 ok
        commit(types.SET_USER, result)
        commit(types.SET_PERMISSION, true)
        console.log(result)
      } catch (e) {
        commit(types.SET_USER, {})
        commit(types.SET_PERMISSION, false)
      }
    },
     [types.SET_ROUTE]({ commit, state }) {
      let { authList } = state.userInfo
      if (authList) {
        let routes = filterRouter() // 过滤路由
      } else {
        // 没权限 也要设置成 有权限
        commit(types.SET_MENU_PERMISSION, true)
      }
    }
  },
};


// function filterRouter(authList) {
//   const auths = authList.map(item => item.auth)
//   function filter(routes) {
//     return routers.filter(route => {
//       if (auths.includes(route.meta.auth)) {
//         if (route.children) {
//           router.children = filter(route.children)
//         }
//         return route
//       }
//     })
//   }
//   return filter(per)
// }