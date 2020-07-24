const fs = require('fs');

// function copy(source, target, cb) {
//   fs.readFile(source, function (err, data) {
//     if (err) return cb(err)
//     fs.writeFile(target, data, cb)
//   })
// }

function copy(source, target, cb) {
//  读一点操作一点（流）   底层还是文件操作
//  fs.open fs.read fs.write fs.close  一般用不到 这是文件流的原理
  const buffer = Buffer.alloc(3);
  let offsetRead = 0;
  let offsetWrite = 0;
  //  w, r, a
  fs.open(source, 'r', (err, fd) => { // 文件描述符
    fs.open(target, 'w', 0o666, (err, wfd) => {
      function next() {
        // 我要读取文件 fd， 读到 buffer
        // 从 buffer 的哪个位置写入 写入多少个 从文件的哪个位置开始读取
        fs.read(fd, buffer, 0, 3, offsetRead, (err, bytesRead) => {
          offsetRead += bytesRead
          // console.log(bytesRead)// 真实读取到文件的个数
          // 权限 默认是 0o666  八进制
          // 第一个rwx 表示 我可以操作文件  读取、写入、执行
          // 第二个表示 组  第三个表示其他人
          // 写入文件 从 buffer 的第几个位置 写入几个 从文件的哪个位置开始写
          fs.write(wfd, buffer, 0, bytesRead, offsetWrite, (err, written) => {
            offsetWrite += written
            if (bytesRead === 3) next()
            else {
              fs.close(fd, () => {
              })
              fs.close(wfd, () => {
              })
              return cb()
            }
          })
        })
      }
      next()
    })
  })

}


copy('./name.txt', 'copy.txt', function (err) {
  if (err) return console.log(err)
  console.log('拷贝完成')
})




