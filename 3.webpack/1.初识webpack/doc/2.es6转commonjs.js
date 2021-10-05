function __webpack_require__() {
}

// define __esModule on exports
__webpack_require__.r = function (exports) {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
  }
  Object.defineProperty(exports, '__esModule', { value: true })
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
let exp = {}
__webpack_require__.r(exp)

console.log(Object.prototype.toString.call(exp)) // [object Module] 表示这是一个模块对象
console.log(exp.__esModule) // 若干 exports 身上有一个 __esModule= true，就表示这个模块前是一个es6模块
// 如果 代码中出现了 import 或者 export 关键字的话， 那么这个模块就是 es6 模块
// webpack 里面 你不管是什么模块，都会变成 common.js 模块



