import Vue from 'vue';
import router from './router'
import App from './App.vue'
// 没有提供的文件 会采用 vue-cli 中自带的默认文件
const vm = new Vue({
  el: '#app',
  name: 'root',
  router,
  render: h => h(App)
})

console.log(vm)




// 路由 两种模式的路由  （mpa 多页应用中跳转逻辑都是由后端处理）
// 前后端分离 前端需要根据路径的不同进行跳转 (可以根据 hash 值 显示变化的内容) 一般上线时不采用这种方式

// history 模式用户生产环境 （需要服务端支持，否则一刷新页面就404了）
// hash模式   history模式
// history.pushState({}, null, '/a) -> 浏览器提供的方法