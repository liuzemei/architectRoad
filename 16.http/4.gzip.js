// node 支持的 压缩格式 有两个 gzip, deflate, （node 不支持 br）

//

const zlib = require('zlib')
const fs = require('fs')

// 压缩 .gz 结尾的包 => gzip  压缩机制 重复性越高压缩率越高
// 方法有异步 同步 流 转化流 （读流 写流 双工流 转化流）
// 同步
const content = fs.readFileSync('./1.txt')
let r = zlib.gzipSync(content)
console.log(content)
console.log(r)
fs.writeFileSync('1.gz', r)

// 流的方式
// 转化流可以充当读 也可以充当写流 （继承了可读流和可写流）
fs.createReadStream('./1.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('1.gz', r))
// 用得比较少
// fs.createReadStream('./1.txt').pipe(zlib.createDeflate()).pipe(fs.createWriteStream('1.gz', r))
