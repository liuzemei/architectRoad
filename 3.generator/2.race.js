// Promise.all 方法 所有的都成功了 才算成功，如果有一个失败就走失败

const { resolve, reject } = require('bluebird');

// Promise.race 采用最先成功或者最先失败的作为结果

const fs = require('fs').promises;




// race 实现

Promise.race = (promises) => {
  return new Promise((resolve, reject) => {
    // 一起执行就是 for 循环
    for (let i = 0; i < promises.length; i++) {
      let val = promises[i];
      if (val && typeof val.then === 'function') {
        val.then(resolve, reject)
      } else {//普通纸
        resolve(val)
      }
    }
  })
}


// let readFiles = [
//   fs.readFile('./name.txt', 'utf-8'),
//   fs.readFile('./age.txt', 'utf-8'),
// ]

// // 多个请求 采用最快的 -> 或者可以自己封装中断方法
// Promise.race(readFiles).then(console.log).catch(console.log)

const promise = new Promise((resolve, reject) => {
  setTimeout(() => { // 模拟的接口调用  ajax 肯定有超时设置
    console.log(12312312)
    resolve('成功')
  }, 1000 * 5);
})

function wrap(promise) {
  //  在这里包装一个 promise 可以控制原来的 promise 是成功还是失败
  let abort
  let newPromise = new Promise((resolve, reject) => {
    abort = reject
  })
  let p = Promise.race([promise, newPromise])
  p.abort = abort
  return p
}

let newPromise = wrap(promise)

setTimeout(() => {
  // 超过 3s 就算超时 应该让 promise 走到失败态
  newPromise.abort('超时了')
}, 3000);


newPromise.then(console.log).catch(console.log)
