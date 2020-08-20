import Vue from 'vue'
import Router from './vue-router'
import Home from './views/Home'
import About from './views/About'

Vue.use(Router)

// 路由导出后 需要被注册到实例中
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About,
      children: [
        {
          path: 'a',
          component: {
            render: (h) => h('h1',{}, 'AAAAA')
          }
        },
        {
          path: 'b',
          component: {
            render: (h) => h('h1',{}, 'BBBBB')
          }
        }
      ]

    }
  ]
})