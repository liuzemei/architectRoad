import { initMixin } from "./init"



function Vue(options) {
  this._init(options) // 入口方法，做初始化操作
}


// 写成一个个的插件进行对原型的扩展
// 初始化方法
initMixin(Vue)



export default Vue



// export const fn = () => {
//   console.log(123)
// }