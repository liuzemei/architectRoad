// Promise 是一个类 需要 new 这个类型

// 1. executor 执行器 默认会立即执行
// 2. 默认 promise 的状态是等待态  （三个状态 等待 成功 失败）
// 3. 当调用 resolve 时 变成成功态  调用 reject 会变成失败态
// 4. 返回的实例上有一个then方法，then中需要提供两个参数，粉表示成功对应的函数和失败对应的函数
// 5. 如果同时调用成功和失败 默认会采取第一次调用的结果
// 6. 抛出异常就走失败逻辑
// 7. 成功时可以传入成功的值， 失败时可以传入失败的值

let Promise = require('./promise') // 引入自己的 promise
let promise = new Promise((resolve, reject) => { // resolve 代表的是成功的回调  reject 表示的是失败的回调
  reject('error')
  resolve('ok')
  throw new Error('error1')

  // setTimeout(() => {
  //   resolve('ok') // 简单实现了 Promise 但如果 executor 中有异步操作，.then 的两个方法就都不会执行了
  // }, 100);
})



promise.then((v) => {
  console.log('success', v)
}, (e) => {
  console.log('fail', e)
})


