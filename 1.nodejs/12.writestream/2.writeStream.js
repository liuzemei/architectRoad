// 只使用1个字节来处理 写入操作

const fs = require('fs')

const WriteStream = require('./writeStream')

let ws = new WriteStream('./copy.txt', {
// let ws = fs.createWriteStream('./copy.txt', {
  highWaterMark: 3// 预期这个文件只用1个字节来写入 0-9 个数
})

let i = 0

function write() {
  let canWrite = true
  while (i < 10 && canWrite) {
    canWrite = ws.write(i++ + '')
  }
  // if (i === 10) ws.end()
}

ws.on('drain', function () { // 当写入的个数达到预期 或者 超过预期 （并且数据写入到文件中 才会触发）
  console.log('drain')
  write()
})

ws.on('close', function () {
  console.log('close')
})

ws.on('error', function (e) {
  console.log(e)
})

write()

// ws.write()   end()   on('drain')
