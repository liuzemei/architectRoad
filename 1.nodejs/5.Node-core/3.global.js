// node 中的全局对象
// window  global

// console.log(Reflect.ownKeys(global))

// console.log(Object.keys(global))

// console.dir(global, {showHidden: true})

// queueMicrotask  // 微任务  11版本后才有

// setImmediate   // 宏任务
// clearImmediate // 清除宏任务

// 都是 global 上的
// process  进程
// Buffer  二进制

// console.log(global.require) // undefined

// require module exports __filename __dirname 都不是 global 上的属性 但是可以直接被访问
// （这些都是函数的参数）


// 全局变量（可以在当前文件中直接访问的变量）


// 如果同时在主模块中调用，无法知道哪个先调用
// setTimeout(() => {
//   console.log('setTimeout')
// }, 0);


// setImmediate(() => {
//   console.log('setImmediate')
// })

// 在 io 的回调中执行的顺序是 setImmediate 优先级高一些
const fs = require('fs')
fs.readFile(__filename, () => { // i/o 操作完毕后 微任务操作完毕后 调用的方法
  setTimeout(() => {
    console.log('setTimeout')
  }, 0);
  setImmediate(() => {
    console.log('setImmediate')
  })
})

// timer 存放定时器的 poll 轮询处理 i/o回调的 check setImmediate



// 每次执行一个宏任务完毕后会清空微任务（执行顺序和浏览器是一致的）

// node 版本 11以上
// nextTick 微任务 i/o操作 宏任务












