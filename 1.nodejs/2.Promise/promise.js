console.log('my')

const ENUM = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}

// 需要兼容 其他人的 promise
const resolvePromise = (x, promise2, resolve, reject) => {
  // 1. 如果 x 和 promise2 引用了同一个对象，使用 TypeError 作为失败原因，调用 reject
  if (x === promise2) return reject(new TypeError(`Chaining cycle detected for promise #<Promise>`))
  //  2. 如果 x 是一个 promise 那么就采用他的状态
  //  3. 如果 x 是一个对象 或者 是一个函数，看看有没有 then 方法

  if (x !== null && typeof x === 'object' || typeof x === 'function') {
    //   x 是一个对象或者一个函数
    try {
      // 对象取值也可能报错...
      // Object.DefinedProperty(obj, 'then', {get(){throw new Error('xxx')}})
      let then = x.then;
      //  没报错，如果 then 是一个函数，那么就是promise
      if (typeof then === 'function') {
        // 复用上次取出来的 then ，防止 get 方法重复执行
        // 递归解析 y 的值，直到这个结果是一个普通值为止，将结果作为 promise2 的成功或者失败
        // 一旦失败，直接失败即可...
        then.call(x, y => resolvePromise(y, promise2, resolve, reject), r => reject(r))
      } else {
        // 普通对象，不是 promise
        resolve(x)
      }
    } catch (e) {
      reject(e)
    }
  } else {
    //  4. 普通值
    resolve(x) // 直接成功即可
  }


}

class Promise {
  constructor(executor) {
    this.status = ENUM.PENDING
    this.value = undefined
    this.reason = undefined

    // 许可创建成功的队列 失败的队列，分别存放
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      // 我需要根据 x 的状态来判断是调用 resolve 还是 reject
      if (this.status === ENUM.FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === ENUM.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === ENUM.PENDING) {
        // 用户还没有调用 resolve 和 reject
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
}

module.exports = Promise
