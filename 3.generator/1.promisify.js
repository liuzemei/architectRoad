//  all race finally


//  promisify -> 把一个 node 中的 api 转换成 promise 的写法

const fs = require('fs'); // 核心模块
const util = require('util');

const promisify = fn => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (err, data) => { // node 中的回调函数的参数  第一个永远是error
      if (err) reject(err)
      resolve(data)
    })
  })
} // 典型的高阶函数



// let read = promisify(fs.readFile)

// read('./name.txt', 'utf8').then(data => {
//   console.log(data)
// })

// 自己实现一个 read 方法 进行包装
// fs.readFile('./name.txt', 'utf8', (err, data) => {

// })

// bluebird 第三方的 别人写的模块

const bluebird = require('bluebird')

// 默认会将原有的方法 全部增加一个 async 后缀 变成 promise 写法

const promisifyAll = target => {
  Reflect.ownKeys(target).forEach(key => {
    if (typeof target[key] === 'function') {
      target[key + 'Async'] = promisify(target[key])
    }
  })
  return target
}

// const newFs = bluebird.promisifyAll(fs)
const newFs = promisifyAll(fs)
console.dir(newFs)

newFs.readFileAsync('./name.txt', 'utf8').then(console.log)




