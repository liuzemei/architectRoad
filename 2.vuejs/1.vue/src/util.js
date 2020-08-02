export function proxy(vm, data, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[data][key]
    },
    set(newValue) {
      if (newValue === vm[data][key]) return
      vm[data][key] = newValue
    }
  })
}

export function defineProperty(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false, // 不能被枚举(不能被循环出来)
    configurable: false, // 不能被修改
    value: value
  })
} 