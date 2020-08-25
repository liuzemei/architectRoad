import Vue from "vue";
import VueRouter from "vue-router";

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

export default router;
