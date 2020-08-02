// generator = redux-saga (generator)  可以暂停

const { link } = require("fs");
const { resolve, reject } = require("bluebird");

// generator 生成器 -> 生成迭代器 iterator

// 可以把类数组转化成数组
// [...arguments] Array.from(arguments)

// 有索引 有长度 能遍历


// let likeArray = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }// 默认这样写的数组是不能被迭代的，
// // console.log([...likeArray]) // TypeError: likeArray is not iterable
// console.log(Array.from(likeArray)) // ok 这种方式不需要迭代器

// 迭代器实现：
// js 的基础数据类型 ， Symbol 中有很多元编程的方法 -》 可以更改 js 本身的功能

// likeArray[Symbol.iterator] = function () {
//   // 迭代器是一个 对象 对象中有 next 方法，每次调用 next 都需要返回一个对象 {value, done}
//   let index = 0;
//   return {
//     next: () => { // 会自动调用这个方法
//       return {
//         value: this[index],
//         done: index++ === this.length
//       }
//     }
//   }
// }

// console.log([...likeArray]) // ok


//  生成器 es6 的一个 api

// function* read() { // generator 函数，碰到 yeild 就会暂停
//   yield 1;
//   yield 2
// }

// // 生成器返回的是迭代器
// let it = read()

// console.log(it.next()) // {value:1, done: false}
// console.log(it.next()) // {value:2, done: false}
// console.log(it.next()) // {value:undefined, done: true}


// likeArray[Symbol.iterator] = function* () {
//   let index = 0
//   while (index !== this.length) {
//     yield this[index++]
//   }
// }



//  通过 generator 来优化 promise (promise 缺点是 不停的回调， 不停的链式调用)

const fs = require('fs').promises
function* read() {
  try {
    let content = yield fs.readFile('./name.txt', 'utf-8')
    let age = yield fs.readFile(content, 'utf-8')
    return age
  } catch (e) {
    console.log(e, '********')
  }
}

// let it = read();
// let { value, done } = it.next()
// value.then(data => {
//   let { value, done } = it.next(data); // 除了第一次的传参没有意义外，剩下的传参结果会赋予给 上一次的 yield 的返回值
//   value.then(data => {
//     let { value, done } = it.next(data)
//     console.log(value, done)
//   })
// }).catch(e => {
//   it.throw(e)
// })
// it.next()

function co(it) {
  return new Promise((resolve, reject) => {
    // 一步迭代 需要根据函数来实现
    function next(data) {
      let { value, done } = it.next(data)
      if (done) {
        return resolve(value) // 直接让 promise 成功 用当前的结果
      } else {
        Promise.resolve(value).then(next, reject)
      }
    }
    next()
  })
}



co(read()).then(data => {
  console.log(data)
}).catch(console.log)