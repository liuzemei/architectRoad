import Vue from "vue";
import Vuex from "vuex";
import rootModules from "./rootModules";

Vue.use(Vuex);

const files = require.context("./modules", false, /\.js$/);

rootModules.modules = rootModules.modules || {};

// 自动根据当前 store 中的模块名解析 vuex 中的状态
files.keys().forEach((key) => {
  let moduleName = key.replace(/\.\//, "").replace(".js", "");
  let store = files(key).default;
  store.namespaced = true;
  rootModules.modules[moduleName] = store;
});

export default new Vuex.Store(rootModules);
