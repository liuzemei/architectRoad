// 函数柯里化

// 判断一个元素的类型 数组 对象 数字 

// 类型判断应该使用什么方法来判断
// 1. typeof 不能细分对象类型
// 2. constructor 可以判断这个实例是通过谁来构造出来的
// 3. instanceof 区分实例  __proto__
// 4. Object.prototype.toString.call([])  区分具体的类型，不能区分实例

// function isType(content, typing) {
//   return Object.prototype.toString.call(content) == `[object ${typing}]`
// }

// isType('hello', 'String')
// 用户传递参数时出错导致结果出现，----> 内置参数
// 细化函数的功能--> 让他变得更具体一些。

// let util = {}

// const isType = typing => content => {
//   return Object.prototype.toString.call(content) == `[object ${typing}]`
// }


// ['String', 'Number', 'Null', 'Undefined'].forEach(typing => {
//   util['is' + typing] = isType(typing)
// })

// console.log(util.isUndefined(undefined))

// 偏函数 也是分开传递参数 但是参数个数一定是一个



// 通用的函数柯里化
function sum(a, b, c, d) {
  return a + b + c + d
}

const currying = (fn, arr = []) => { // 记录调用时参数的个数 和 函数个数的关系
  let len = fn.length; // 函数参数的个数
  return (...args) => {
    let concatArgs = [...arr, ...args];
    if (concatArgs.length < len) {
      return currying(fn, concatArgs)
    } else {
      return fn(...concatArgs)
    }
  }
}

const newSum = currying(sum)

console.log(newSum(1)(2)(3, 4))
