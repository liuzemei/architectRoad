(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  // 拿到数组原型上的方法
  var oldArrayProtoMethods = Array.prototype; // 继承一下 arrayMethods.__proto__ = oldArrayProtoMethods

  var arrayMethods = Object.create(oldArrayProtoMethods);
  var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      // this 就是 observer 里的 value
      var inserted;
      var ob = this.__ob__;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      switch (method) {
        case 'push':
        case 'unshift':
          // 这两个方法都是追加 追加的内容可能是对象类型，应该被再次进行劫持
          inserted = args;
          break;

        case 'splice':
          // vue.$set 原理
          inserted = args.slice(2);
        // arr.splice(0,1,{a:1}) 在第0个索引，删除一个，并新增一个 a
      }

      if (inserted) ob.observeArray(inserted); // 数组新增的值也要进行观测

      return oldArrayProtoMethods[method].apply(this, args);
    };
  });

  function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[data][key];
      },
      set: function set(newValue) {
        if (newValue === vm[data][key]) return;
        vm[data][key] = newValue;
      }
    });
  }
  function defineProperty(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      // 不能被枚举(不能被循环出来)
      configurable: false,
      // 不能被修改
      value: value
    });
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 使用 defineProperty 重新定义属性
      // 判断一个对象是否被监控
      defineProperty(value, '__ob__', this);

      if (Array.isArray(value)) {
        value.__proto__ = arrayMethods; // 观测数组中的对象类型，对象变化也要做一些事

        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        for (var i = 0, len = value.length; i < len; i++) {
          var item = value[i];
          observe(item); // 观测数组中的对象类型
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]); // Vue.util.defineReactive
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        console.log('用户获取值了', data, key, value);
        return value;
      },
      set: function set(newValue) {
        console.log('用户设置值了', data, key, value);
        if (newValue === value) return;
        observe(newValue);
        value = newValue;
      }
    });
  }

  function observe(data) {
    // 是对象，且不能 null
    if (_typeof(data) !== 'object' || data === null || data.__ob__) return data;
    return new Observer(data);
  }

  function initState(vm) {
    var opts = vm.$options;
    if (opts.props) ;
    if (opts.methods) ;
    if (opts.data) initData(vm);
    if (opts.computed) ;
    if (opts.watch) ;
  }

  function initData(vm) {
    var data = vm.$options.data;
    vm._data = data = typeof data === 'function' ? data.call(vm) : data; // 数据的劫持方案 对象 Object.defineProperty
    // 数组 单独处理
    // 当我去 vm 上 取属性时，帮我将属性的取值代理到 vm._data 上

    for (var key in data) {
      proxy(vm, '_data', key);
    }

    observe(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 初始化状态（将数据做一个初始化的劫持 当我改变数据时应该更新视图）
      // vue 组件中有很多状态 data props watch computed

      initState(vm); // vue 里边核心特性 响应式数据源里
      // Vue 是一个什么样的框架 MVVM
      // 数据变化视图会更新，视图变化数据会被影响（MVVM: 不能跳过数据区更新视图，但是Vue没有遵循MVVM，$ref）
    };
  }

  function Vue(options) {
    this._init(options); // 入口方法，做初始化操作

  } // 写成一个个的插件进行对原型的扩展
  // 初始化方法


  initMixin(Vue);
  //   console.log(123)
  // }

  return Vue;

})));
//# sourceMappingURL=vue.js.map
