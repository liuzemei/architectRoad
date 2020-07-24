// 宏任务 和 微任务

// Vue2 中如何实现异步更新的   多次修改数据但是页面只更新一次

// 异步的方法 无论是 微任务 还是宏任务 都是要等待同步代码执行完毕

// vue2 源代码 nextTick  src/core/util

// 数据更新完毕我们希望尽可能提前更新页面 先采用微任务

//  有些时候

//  microtasks 微任务             macrotasks 宏任务
//  MutationObserver 微任务       setImmediate(ie兼容) chrome 的某些版本支持
//                               messageChanel

// 页面加载完毕后需要加载首屏数据  MutationObserver



