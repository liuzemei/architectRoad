import applyMixin from "./mixin";
import { forEachValue } from "./utils";

export let Vue;

export class Store {
  // 容器的初始化
  constructor(options) {
    // {state:'',mutation: '',actions: ''}
    const state = options.state; // 数据变化要更新视图(Vue 的核心逻辑 依赖收集)
    // 响应式的数据 new Vue({data})
    const computed = {};

    // 2. 处理 getters 属性 具有缓存的 computed 带有缓存 （多次取值如果值不变是不会重新取值的）
    this.getters = {};
    forEachValue(options.getters, (fn, key) => {
      computed[key] = () => fn(this.state); // 将用户的 getters 定义在实例上
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key], // 取值的时候 直接拿 getters 的结果，就会有缓存效果。
      });
    });
    // 2.1 . 计算属性的实现
    this._vm = new Vue({
      data: {
        // 属性如果是通过 $ 开头的， 默认不会讲这个属性挂载到 vm 上
        $$state: state, // Vue 会将 $$state 对应的对象 都通过 defineProperty 进行属性劫持
      },
      computed,
    });

    // 3 实现 mutations
    this.mutations = {};
    this.actions = {};

    forEachValue(options.mutations, (fn, key) => {
      this.mutations[key] = (payload) => fn(this.state, payload);
    });

    forEachValue(options.actions, (fn, key) => {
      this.actions[key] = (payload) => fn(this, payload);
    });
  }
  get state() {
    return this._vm._data.$$state;
  }

  // 在严格模式下 actions 和 mutations 是有区别的...
  commit = (type, payload) => {
    // 保证 this 指向当前实例
    // 调用 commit 其实就是去找 刚才 绑定好的 mutation
    this.mutations[type](payload);
  };

  dispatch = (type, payload) => {
    this.actions[type](payload);
  };
}

export const install = (_Vue) => {
  // _Vue 就是 Vue 的构造函数
  // 插件的安装
  Vue = _Vue;

  // 需要将根组件中注入的 Store 分派给每一个组件（子组件）
  applyMixin(Vue);
};
