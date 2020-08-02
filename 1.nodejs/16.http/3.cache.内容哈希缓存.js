// 1）内容没有变，但是修改时间变了
// 2）1s之内变化了n次 是监控不到的

// ==> 根据文件内容来比对（不适合大文件） 好处是精准

const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const crypto = require('crypto')


const hash = value => { // string | buffer
  return crypto.createHash('md5').update(value).digest('base64')
}

http.createServer((req, res) => {
  let { pathname } = url.parse((req.url))
  pathname === '/' && (pathname = 'index.html')
  let filePath = path.join(__dirname, 'public', pathname)
  res.setHeader('cache-control', 'no-cache') //
  fs.stat(filePath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }

    let md5 = hash(fs.readFileSync(filePath))
    res.setHeader('Etag', md5)
    const ifNoneMatch = req.headers['if-none-match']
    if (ifNoneMatch === md5) {
      res.statusCode = 304
      return res.end()
    }


    if (statObj.isFile()) {
      fs.createReadStream(filePath).pipe(res);
    }
  })
}).listen(3000)


