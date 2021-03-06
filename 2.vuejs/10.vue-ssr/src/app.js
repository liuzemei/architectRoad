import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router/createRouter";
import createStore from "./store/createStore";

export default () => {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });
  return { app, router, store }; // 后续会导出 路由 Vue
};

// 1. 以前代码再前端跑的时候 每个客户端都拥有一个独立的实例
// 2. 每次客户端访问都要产生一个新的实例 这里导出一个函数
