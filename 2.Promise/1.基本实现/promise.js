
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
    const resolve = (value) => {
      // 如果是等待台可以更改状态
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.FULFILLED
        this.value = value
      }
    }
    const reject = (reason) => {
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.REJECTED
        this.reason = reason
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
  }
}

module.exports = Promise
