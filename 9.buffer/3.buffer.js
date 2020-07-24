// Node 中 提供了 一个类 可以来生成 buffer


// 一、 创建 buffer
// 创建一个 buffer 的几种方式 （内存），默认 buffer 是不支持扩容的
// 1. 创建的时候必须要指定大小
// let buf = Buffer.alloc(5)
// buf[6] = 100
// console.log(buf)
// // 2. 通过字符串来生成 buffer
// let buf2 = Buffer.from('珠峰')
// console.log(buf2)
// // 3. 用不到
// let buf3 = Buffer.from([100, 200, 256]); // 如果超过255 会对255取余-1
// console.log(buf3)


// // 二、buffer的拼接 、 截取 、
// // 判断是否是一个 buffer
// console.log(Buffer.isBuffer(buf3)) // true

// // 查看长度
// console.log(buf.length)
// console.log(buf.byteLength)

// // 截取
// let arr = [[2, 3, 4]]
// let newArr = arr.slice()
// newArr[0][1] = 100
// // 浅拷贝
// console.log(arr) // [[100,3,4]]

// // base64 和 字符串相互转化
// console.log(Buffer.from('珠峰').slice(0, 3).toString())
// console.log(Buffer.from('珠峰').toString('base64'))
// console.log(Buffer.from('54+g5bOw', 'base64').toString())

// // buffer的拼接
// let b1 = Buffer.from('珠峰');
// let b2 = Buffer.from('架构');
// // 扩容 弄一个更大的空间 将 b1 b2 拷贝过去
// // 1. copy 用的比较少
// // let big = Buffer.alloc(12);
// // b1.copy(big, 0)
// // b2.copy(big, 6)
// // console.log(big.toString())


// Buffer.prototype.concat = (bufferList, len = bufferList.reduce((a, b) => a + b.length, 0)) => {
//   let buffer = Buffer.alloc(len);
//   let offset = 0
//   bufferList.forEach(buf => {
//     buf.copy(buffer, offset)
//     offset += buf.length
//   })
//   return buffer
// }

// // 前端的二进制是 ArrayBuffer(二进制)   后端的 Buffer 是 16进制的
// // 2. concat
// console.log(Buffer.concat([b1, b2]).toString())


// 三、

// fs 文件系统模块
// http 文件读写模块 操作文件 文件夹


const fs = require('fs')

// 文件读取 i/o
// 读取文件 => 将硬盘中的内容读取到内存中
// 写入文件 => 将内容中的内容写入到硬盘中
// 如果文件很大，就会淹没内容

// 文件模块中有很多api 多数都是同步和异步并存的
// 什么时候用同步读取（性能高  阻塞问题） 什么时候异步读取（程序运行时，尽量采用异步方式）
// fs.readFileSync('xxx') // 可能内存大小不够，就报错了。
// 所以读取一点操作一点，分片读取，流来读取（文件流）
// fs.read  fs.write 发布订阅模式（解耦合）
// 

