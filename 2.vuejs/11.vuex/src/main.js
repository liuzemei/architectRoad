import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  name: "Root",
  store, // 每个子组件，都会拥有一个
  render: (h) => h(App),
}).$mount("#app");
