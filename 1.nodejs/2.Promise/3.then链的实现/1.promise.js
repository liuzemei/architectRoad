// 2. 实现链式调用

let Promise = require('./promise')
// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('ok')
//   }, 1000);
// })

// 链式调用   (上一次的输出时下一次的输入)
let fs = require('fs')
// fs.readFile('./name.txt', 'utf8', (err, data) => {
//   if (err) return console.log(err)
//   console.log(data)
//   fs.readFile(data, 'utf8', (err, data) => {
//     if (err) return console.log(err)
//     console.log(data)
//   })
// })
// 1. 如何执行的 回调地狱（1. 处理错误不方便 2. 代码不好维护）
// 2. promise 可以通过 then 链来简化流程

// // 场景，以上
// function read(path) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, 'utf8', (err, data) => {
//       if (err) return reject(err)
//       return resolve(data)
//     })
//   })
// }

// then 的使用方式  普通值意味着不是 promise
// 1. then 中的回调有两个方法 成功或者失败，他们的返回结果 会传递给外层的下一个 then 中
// 2. 可以在成功和失败中抛出异常，会走到下一次then的失败中
// 3. 返回的是一个 promise，那么会用这个 promise 的状态来作为结果， 会用 promise 的结果向下传递
// 4. 错误处理流程： 找离自己最近的 catch ，没找到就向下继续查找，找到就执行，
// read('./name.txt')
//   .then(data => read(data))
//   .then(console.log)
//   .catch(console.error) // catch 就是没有成功的 then


// promise 实现原理
// 1. 一旦成功不能失败 一旦失败不能成功
// promise.then 通过返回一个新的 promise 来实现的


function read(path) {
  return new Promise((resolve, reject) => {
    resolve(100)
  })
}

read('./name.txt')
  .then(data => 123)
  .then(data => {
    return 'success' + data
  }, err => {
    console.log('err', err)
  })
