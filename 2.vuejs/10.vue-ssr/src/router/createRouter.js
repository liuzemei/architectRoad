// 创建路由

import Vue from "vue";
import VueRouter from "vue-router";
// 可以用异步组件来加载 （靠的是webpack 中的代码分割功能 import())

Vue.use(VueRouter);

const Home = () => import("../views/Home");
const About = () => import("../views/About");
let routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

export default () =>
  new VueRouter({
    mode: "history",
    routes,
  });
