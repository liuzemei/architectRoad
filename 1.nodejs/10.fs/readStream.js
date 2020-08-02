const EventEmitter = require('events')
const fs = require("fs")

class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'r'
    this.mode = options.mode || 0o666
    this.encoding = options.encoding || null
    this.start = options.start || 0
    this.end = options.end || null
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.autoClose = options.autoClose || true

    //  1) 默认 new 的时候就会打开文件
    this.open()

    this.on('newListener', type => {
      if (type === 'data') {
        //  用户监听了 data 事件
        this.flowing = true
        this.read()
      }
    })

    this.position = this.start
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) return this.emit('error', err)
      this.fd = fd
      this.emit('open', fd)
    })
  }

  pause() {
    this.flowing = false
  }

  resume() {
    this.flowing = true
    this.read()
  }

  read() {
    // 如果 fd 没有 将当前方法订阅号，稍后文件打开后在此读取
    if (typeof this.fd !== 'number') return this.once('open', this.read)
    // 等待打开后开始读取
    // 根据 hightWaterMark 限制读取的大小
    let buffer = Buffer.alloc(this.highWaterMark)
    if (!this.flowing) return
    fs.read(this.fd, buffer, 0, this.highWaterMark, this.position, (err, bytesRead) => {
      if (bytesRead) {
        this.position += bytesRead
        this.emit('data', buffer.slice(0, bytesRead))
        if (this.flowing) this.read()
      } else {
        this.emit('end')
        if (this.autoClose) fs.close(this.fd, () => {
          this.emit('close')
        })
      }
    })
    console.log('开始读取文件')
    console.log(this.fd)
  }
}


module.exports = ReadStream