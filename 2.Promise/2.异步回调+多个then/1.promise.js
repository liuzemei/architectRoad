
// 2. 实现 异步回调 + 多个 then 方法
let Promise = require('./promise')
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('ok')
  }, 1000);
})


promise.then((v) => {
  console.log('success', v)
}, (e) => {
  console.log('fail', e)
})
// 1. 同一个 promise 可以 then 多次 （发布订阅模式）
// 调用 then 时 当前状态如果是等待态，需要将成功和失败的回调 分别进行存放
// 调用 resolve 时 将当前订阅的函数进行执行
promise.then((v) => {
  console.log('success', v)
}, (e) => {
  console.log('fail', e)
})


