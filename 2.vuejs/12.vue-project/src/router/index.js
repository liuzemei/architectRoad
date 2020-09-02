import Vue from "vue";
import VueRouter from "vue-router";
import hooks from './hooks'

Vue.use(VueRouter);
// 每个模块都有自己的路由配置

// 读文件，不
let files = require.context("./routers", false, /\.js$/);

const routes = [];
files.keys().forEach((key) => {
  routes.push(...files(key).default);
});


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//  需要给路由增加多个钩子 每个钩子实现一个具体功能 beforeEach next
Object.values(hooks).forEach(hook => {
  // 绑定hook中的路由实例
  router.beforeEach(hook.bind(router))
})


export default router;
