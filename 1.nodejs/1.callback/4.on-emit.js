// 发布订阅 观察者模式

const fs = require('fs')  // fileSystem
const path = require('path')

// 引申出 发布订阅模式

// 发布和订阅之间没有任何联系
let event = {
  _arr: [],
  on(fn) {
    this._arr.push(fn)
  },
  emit() {
    this._arr.forEach(fn => fn())
  }
}

event.on(() => { // 计划1  先订阅 再出发 订阅和发布之间 没有关联，可以用来解耦操作
  console.log('数据来了')

})
event.on(() => { // 计划1

})

fs.readFile(path.resolve(__dirname, '_age.txt'), { encoding: 'utf-8' }, (err, data) => {
  obj.age = data
  event.emit()
})
fs.readFile(path.resolve(__dirname, '_name.txt'), { encoding: 'utf-8' }, (err, data) => {
  obj.name = data
  event.emit()
})

