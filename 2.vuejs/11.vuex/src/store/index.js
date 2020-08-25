import Vue from "vue";
import Vuex from "@/vuex";

Vue.use(Vuex); // 使用这个插件 内部会调用Vuex中的install方法

export default new Vuex.Store({
  state: {
    //  -> data
    age: 10,
  },
  getters: {
    //  -> computed
    myAge(state) {
      console.log(123);
      return state.age + 15;
    },
  },
  mutations: {
    // -> method
    // mutation 第一个参数是状态
    changeAge(state, payload) {
      state.age += payload;
    },
  },
  actions: {
    // -> 复杂 method(异步)
    changeAge({ commit }, payload) {
      setTimeout(() => {
        commit("changeAge", payload);
      }, 1000);
    },
  },
});

// 1. Vue.use(Vuex)  Vuex是一个对象 有 install 方法
// 2. Vuex中有一个 Store 类
// 3. 混入到组件中 增添 store 属性
