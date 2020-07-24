const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

let flag = false

http.createServer((req, res) => {
  let { pathname } = url.parse((req.url))
  pathname === '/' && (pathname = 'index.html')
  let filePath = path.join(__dirname, 'public', pathname)
  // 秒次都向服务器发请求
  res.setHeader('cache-control', 'no-cache') //

  // 如果静态资源没有发生变化 返回之前的文件就好了（直接找缓存就好）
  // 根据文件的修改时间来判断这个文件是否发生变化


  fs.stat(filePath, (err, statObj) => {
    if (err) {
      // favicon.ico 浏览器自己回去请求这个文件
      res.statusCode = 404
      res.end('Not Found')
      return
    }

    // 服务器给浏览器一个 Last-Modified 浏览器下次请求的时候，会还给你一个 If-Modified-since
    let ctime = statObj.ctime.toGMTString()
    res.setHeader('Last-Modified', ctime) // 我希望增加一个标识，这个文件的最后修改时间
    let since = req.headers['if-modified-since']
    if (since === ctime) { // 文件没有变化
      res.statusCode = 304
      return res.end()
    }

    if (statObj.isFile()) {
      fs.createReadStream(filePath).pipe(res);
    }
  })
}).listen(3000)


