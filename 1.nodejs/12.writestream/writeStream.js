const EventEmitter = require('events')
const fs = require('fs')

class LinkList {
  constructor(props) {
    this.head = null  // 默认应该指向第一个节点
    this.size = 0 // 通过这个长度 可以遍历这个链表
  }

  add(index, element) {
    if (arguments.length === 1) { // 就是向末尾添加
      element = index
      index = this.size
    }
    if (index < 0 || index > this.size) throw  new Error('添加的索引不正常')
    if (index === 0) { // 在头部添加元素
      let head = this.head
      this.head = new Node(element, head)
    } else {
      // 先获取前一个
      let current = this.head
      // 不停的遍历， 找到最后一项
      for (let i = 0; i < index - 1; i++) {
        current = current.next
      }
      // 让创建的元素指向上一个元素的下一个
      current.next = new Node(element, current.next)
    }
    this.size++
  }

  remove(index) {
    if (index < 0 || index >= this.size) throw new Error('删除的索引不正常')
    let removeItem
    this.size--
    if (index === 0) {
      removeItem = this.head
      this.head = this.head.next
    } else {
      let current = this.head
      for (let i = 0; i < index - 1; i++) {
        current = current.next
      }
      removeItem = current.next
      current.next = current.next.next
    }
    return removeItem
  }

  get(index) {
    if (index < 0 || index >= this.size) throw new Error('删除的索引不正常')
    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current.next()
    }
    return current
  }
}


class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}


class Queue {
  constructor() {
    this.ll = new LinkList()
  }

  offer(element) {
    this.ll.add(element)
  }

  peek() {
    return this.ll.get(0)
  }

  remove() {
    return this.ll.remove(0)
  }
}

class WriteStream extends EventEmitter { // call + 原型继承
  constructor(path, options) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.encoding = options.encoding || 'utf8'
    this.start = options.start || 0
    this.mode = options.mode || 0o666
    this.highWaterMark = options.highWaterMark || 16 * 1024

    //  我要区分当前是否正在写入
    this.writing = false // 默认是没有正在写入的
    this.len = 0  // 维护写入个数的 稍后需要和 highWaterMark 进行比较
    this.needDrain = false // 当前是否需要触发 drain 事件
    this.offset = this.start // 写入的位置
    this.cache = new Queue()
    this.open() // 打开文件
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) return this.emit('error', err)
      this.fd = fd;
    })
  }

  write(chunk, encoding, cb) {
    // 将写入的数据 转化成 buffer
    // 统一成 buffer 来进行写入
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.len += chunk.length
    let flag = this.len < this.highWaterMark
    // 如果 写入的内容个数大于等于highWaterMark 就需要触发 drain 事件
    this.needDrain = !flag
    if (this.writing) {
      // 将当前写入内容保存到链表中
      // 暂存当前的操作
      this.cache.offer({ chunk, encoding, cb })
    } else {
      //   第一次走到这里
      //   将数据写入文件中
      this.writing = true
      this._write(chunk, encoding, () => {
        cb && cb()
        this.clearBuffer()
      })
    }
    return flag
  }

  clearBuffer() {
    let data = this.cache.remove()
    if (data) {
      let { chunk, encoding, cb } = data.element
      this._write(chunk, encoding, () => {
        cb && cb();
        this.clearBuffer()
      })
    } else {
      // 说明写入完成了
      this.writing = false
      if (this.needDrain) {
        this.needDrain = false;
        this.emit('drain')
      }
    }
  }

  _write(chunk, encoding, cb) {
    if (typeof this.fd !== "number") return this.once('open', () => this._write(chunk, encoding, cb))
    console.log(234)
    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
      this.len -= written // 写入后 缓存数减少
      this.offset += written
    })
  }


}

module.exports = WriteStream