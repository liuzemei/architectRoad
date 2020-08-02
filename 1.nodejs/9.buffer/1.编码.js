// let sum = 0;


// for (let i = 0; i < 8; i++) {
//   sum += 2 ** i
// }

// // 1个字节有不同的表示方法 可以用 2 进制表示 11111111 十进制来表示 255  十六进制 ff  八进制 0377 一个字节最大就是255

// console.log(parseInt(11, 3))
// console.log(sum)

// // iconv-lite
// const iconvLite = require('iconv-lite')
// let r = require('fs').readFileSync(require('path').resolve(__dirname, '1.txt'))
// r = iconvLite.decode(r, 'gbk')
// console.log(r)

// 爬虫 
// 1. 爬 html -> 请求人家的网址 拿到 dom 自己分析
// 2. 爬 接口 -> 访问人家接口拿到数据
// 3. 爬 图片 -> 屋头浏览器

// 1 个字符  ascii 文字用的utf8
// 2进制 8个bit -> 1个字节 1024字节 = 

// console.log((255).toString(2))
// console.log(255..toString(2))
// // 默认 js 包装类型 我去.某个方法时 会先进行装包 调用此方法

// console.log(parseInt('1111111', 2))


// base64 有哪些好处？

// 所有的图片都要转成 base64 吗？ 在网络传输过程中不能传递中文 => base64URL
// 图片可以转化成 base64 只要能写url的都可以使用 base64 (base64可以代表这个文件，不需要发请求，大文件不能转 base64)
// 只是进行了编码而已 -> 再变回来

// 不同的文件有不同的 base64 的编码风格（对照表）
// 汉字 1个汉字3个字节 3*8 = 24位 => 4*6 (base64 会比原内容大1/3)

// '六'; // 1个汉字 3个字节 24位
// let r = Buffer.from('六'); // 16进制
// console.log(r) // e7 8f a0

// console.log(0xe7.toString(2))
// console.log(0x8f.toString(2))
// console.log(0xa0.toString(2))
// // 111001 111000 111110 100000


// // 汉字规则


// //  ==> 补零
// // 00111001 00111000 00111110 00100000

// console.log(parseInt('00111001', 2))
// console.log(parseInt('00111000', 2))
// console.log(parseInt('00111110', 2))
// console.log(parseInt('00100000', 2))


// // base64 取值范围 规则 0-63之间
// let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// str += str.toLowerCase()
// str += '0123456789+/'


// console.log(str[57] + str[56] + str[62] + str[32])

// // 所以从3个字节变成了4个字节 => 增加了 1/3 的体积

// // 后面会经常用到 base64编码
// // 

// console.log(parseFloat('11.11', 3))


// 
// let r = Buffer.from('珠a峰')
// console.log(r)


// 二进制中的其他算法


