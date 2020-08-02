import { observe } from "./observer/index"
import { proxy } from './util'

export function initState(vm) {

  const opts = vm.$options
  if (opts.props) initProps(vm)
  if (opts.methods) initMethods(vm)
  if (opts.data) initData(vm)
  if (opts.computed) initComputed(vm)
  if (opts.watch) initWatch(vm)
}

function initProps(vm) { }
function initMethods(vm) { }



function initData(vm) {
  let { data } = vm.$options
  vm._data = data = typeof data === 'function' ? data.call(vm) : data
  // 数据的劫持方案 对象 Object.defineProperty
  // 数组 单独处理
  // 当我去 vm 上 取属性时，帮我将属性的取值代理到 vm._data 上

  for (let key in data) {
    proxy(vm, '_data', key)
  }

  observe(data)
}
function initComputed(vm) { }
function initWatch(vm) { }

