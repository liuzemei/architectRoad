// 发布订阅 观察者模式

const fs = require('fs')  // fileSystem
const path = require('path')

// 概念： 实现异步并发 获取最终结果（计数器 调用的成功个数 达到了预期就执行对应的结果
// 异步的解决方案 可以通过回调的方式来解决
let obj = {}

let after = (times, cb) => () => {
  --times == 0 && cb()
}
let out = after(2, () => { // 我希望更好的可以进行扩展
  console.log(obj)
})
fs.readFile(path.resolve(__dirname, '_age.txt'), { encoding: 'utf-8' }, (err, data) => {
  obj.age = data
  out()
})
fs.readFile(path.resolve(__dirname, '_name.txt'), { encoding: 'utf-8' }, (err, data) => {
  obj.name = data
  out()
})



