import { arrayMethods } from "./array"
import { defineProperty } from "../util"

class Observer {
  constructor(value) {
    // 使用 defineProperty 重新定义属性
    // 判断一个对象是否被监控
    defineProperty(value, '__ob__', this)
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods
      // 观测数组中的对象类型，对象变化也要做一些事
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  observeArray(value) {
    for (let i = 0, len = value.length; i < len; i++) {
      let item = value[i]
      observe(item) // 观测数组中的对象类型
    }
  }

  walk(data) {
    let keys = Object.keys(data)
    keys.forEach(key => {
      defineReactive(data, key, data[key]) // Vue.util.defineReactive
    })
  }
}

function defineReactive(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('用户获取值了', data, key, value)
      return value
    },
    set(newValue) {
      console.log('用户设置值了', data, key, value)
      if (newValue === value) return
      observe(newValue)
      value = newValue
    }
  })
}



export function observe(data) {
  // 是对象，且不能 null
  if (typeof data !== 'object' || data === null || data.__ob__) return data
  return new Observer(data)
}