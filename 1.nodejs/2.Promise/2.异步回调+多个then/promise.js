
console.log('my')

const ENUM = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}

class Promise {
  constructor(exeuctor) {
    this.status = ENUM.PENDING
    this.value = undefined
    this.reason = undefined

    // 许可创建成功的队列 失败的队列，分别存放
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.FULFILLED
        this.value = value

        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.REJECTED
        this.reason = reason

        this.onRejectedCallbacks.forEach(fn => fn())

      }
    }
    try {
      exeuctor(resolve, reject)
    } catch (e) {
      console.log(this)
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === ENUM.FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === ENUM.REJECTED) {
      onRejected(this.reason)
    }
    if (this.status === ENUM.PENDING) {
      // 用户还没有调用 resolve 和 reject
      this.onResolvedCallbacks.push(() => {

        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

module.exports = Promise
