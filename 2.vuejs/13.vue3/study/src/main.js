import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue';
// createApp(App).use(store).use(router).mount('#app')

// Vue3 都是函数

const app = createApp(App)

app.use(Antd);
app.use(store)
app.use(router)
app.mount('#app')

