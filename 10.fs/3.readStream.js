// node 中将文件读取 再次进行了封装操作，封装成了流的操作

// 通过流的方式去读取文件，基于文件操作的方式来封装的（文件流）

const fs = require('fs')

const ReadStream = require('./readStream')

// 创建可读流对象
// const rs = fs.createReadStream('./name.txt', {
const rs = new ReadStream('./name.txt', {
  flags: 'r', // 操作文件的标识 w r a
  mode: 0o666, // 当前可读可写
  autoClose: true, // 读取完毕后调用 fs.close 方法
  encoding: null, // null 默认的表示 buffer 读取的编码
  start: 0, // 开始从文件的哪个位置开始读取
  end: 3, // 读取到文件的哪个位置
  highWaterMark: 2 // 每次读取几个  随便定义  默认不写是 64 * 1024 => 64kb
})

rs.on('open', function () {
  console.log('打开了')
})

const arr = []
rs.on('data', data => {
  console.log(data) // Buffer 将多个 buffer 进行拼接
  arr.push(data)
})
rs.pause() // 暂停指代的是展厅 data 时间的触发


setTimeout(() => {
  rs.resume() // 恢复读取
}, 1000)
rs.on('end', () => {
  console.log(Buffer.concat(arr).toString())
})

rs.on('close', function () {
  console.log('关闭')
})

rs.on('error', function () {
  console.log('出错了')
})

// 可读流： on('data')  on('end')  pause()  resume()
// fs.createReadStream()  基于 fs 的 close open error