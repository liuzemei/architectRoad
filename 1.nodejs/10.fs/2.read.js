// 将1中的代码进行拆分 => 发布订阅模式  （代码的结构  通过发布订阅模式   events 模块）

const EventEmitter = require('./events')
// const EventEmitter = require('./events')

const util = require('util')
// on emit 可以订阅和发布

let events = new EventEmitter()

// console.log(EventEmitter.prototype)

function Girl() { // 我需要继承 EventEmitter 里 原型上的方法

}

Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)

let girl = new Girl();

girl.on('newListener', type => {
  // newListener 是一个固定的名字
  // console.log(type)  // 默认会先调用 newListener 对应的回调此时函数没有被放到数组中
  // 每次绑定后 可以自动触发
  process.nextTick(() => {
    girl.emit(type)
  })
})


let eat = () => console.log("吃")

girl.once('失恋了', eat)
girl.once('失恋了', eat)
girl.once('失恋了', eat)
// girl.once('失恋了', eat)

// girl.off('失恋了', eat)
//
// girl.on('失恋了', () => {
//   console.log('哭')
// })

// events.on('我饿了', () => {
//   console.log('吃饭')
// })
//
// events.on('我饿了', () => {
//   console.log('做饭')
// })
// girl.off('失恋了')

// events.emit('我饿了')
// girl.emit('失恋了')
// girl.emit('失恋了')
// girl.emit('失恋了')
// girl.emit('失恋了')
// girl.emit('失恋了')