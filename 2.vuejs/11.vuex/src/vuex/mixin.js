export default function applyMixin(Vue) {
  Vue.mixin({
    beforeCreate: vuexInit,
  });
}

// 组件的渲染 父 => 子
function vuexInit() {
  const options = this.$options; // 获取用户所有的选项
  // 给所有的组件增加 $store 属性 指向我们创建的 store 实例
  if (options.store) {
    // 说明是 根实例
    this.$store = options.store;
  } else if (options.parent && options.parent.$store) {
    // 说明肯定是子组件
    this.$store = options.parent.$store;
  }
}
