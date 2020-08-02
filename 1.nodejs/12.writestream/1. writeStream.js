const fs = require('fs')
const path = require('path')
let ws = fs.createWriteStream(path.resolve(__dirname, 'name.txt'), {
  flags: 'w',
  encoding: 'utf8',
  mode: 0o666,
  start: 0,
  highWaterMark: 64 * 1024 // 最高水位线，不代表每次写入个数 读取表示每次读取多少个
})

// 内部为了处理多个异步并发，采用了链表
// 拿到写如的个数和 highWaterMark 来比较 如果大于或等于 highWaterMark 就会返回 false
let flag = ws.write('o', function () {
  console.log('o writeOk')
})

ws.write('k', function () {
  console.log('k writeOk')
})

ws.write('123', function () {
  console.log('123')
})

// ws.end('100')

ws.on('close', () => {
  console.log('close')
})

// 内部会讲除了第一次的写入 维护成链表，第一个完成后依次清空剩下的