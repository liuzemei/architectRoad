function EventEmitter() {
  this._events = {}; // this._events['失恋了'] = ['吃', '哭']


}

EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) this._events = {}

  // 如果绑定的不是 newListener 那就需要触发 newLister 方法，将当前 type 传入， 触发 newLister
  if (eventName !== 'newListener') {
    if (this._events['newListener']) {
      this.emit('newListener', eventName)
    }
  }

  let callbacks = this._events[eventName] || []
  callbacks.push(callback)
  this._events[eventName] = callbacks
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  if (this._events[eventName]) {
    // this._events[eventName].forEach(fn => fn(...args))
    this._events[eventName].forEach(fn => Reflect.apply(fn, this, args)) // 等价于 fn.call(this, ...args)
  }
}

EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events[eventName])
    this._events[eventName] = this._events[eventName].filter(event => (event !== callback && event.l !== callback))
}

EventEmitter.prototype.once = function (eventName, callback) {
  const one = () => {
    callback();
    this.off(eventName, one)
  }
  one.l = callback; // 自定义属性
  this.on(eventName, one) // once 内部绑定的是 one 函数
}


module.exports = EventEmitter