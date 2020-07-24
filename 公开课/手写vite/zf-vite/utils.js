const {Readable} = require('stream')
exports.readBody = async stream => {
  // koa 中 要求 所有的异步方法必须包装成 promise
  if (stream instanceof Readable) {
    return new Promise(((resolve, reject) => {
      let res = '';
      stream.on('data', data => {
        res += data
      })
      stream.on('end', () => {
        resolve(res) // 将文件解析完成 抛出去
      })
    }))
  } else {
    return stream.toString()
  }
}