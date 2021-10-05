function __webpack_require__() {
}

// getDefaultExport function for compatibility with non-harmony modules
// 为了兼容非es6模块 获取默认导出    同时兼容 es module 和 common 的默认导出
__webpack_require__.n = function (module) { // 这个module不是module本身，是导出的对象 module.export
  var getter = module && module.__esModule ?
    function getDefault() {
      return module['default'] // 如果这是一个es6模块，那么它的默认导出会挂载导出对象 default 属性上
    } :
    function getModuleExports() {
      return module // 如果是一个 common 模块，那么取导出对象
    }
  __webpack_require__.d(getter, 'a', getter)
  return getter
}

// define getter function for harmony exports 为es6模块导出定义 getter函数
__webpack_require__.d = function (exports, name, getter) {
  if (!__webpack_require__.o(exports, name)) { // 如果 exports 身上没有 name 属性
    //
    Object.defineProperty(exports, name, { enumerable: true, get: getter })
  }
}
// Object.prototype.hasOwnProperty.call
__webpack_require__.o = function (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property)
}

let mod = { name: "neo", __esModule: true, default: { age: 10 } }
let getter = __webpack_require__.n(mod)
console.log(getter.a)
