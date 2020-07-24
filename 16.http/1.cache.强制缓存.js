const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')


// 如果文件 变化性特别低 设置强制缓存
http.createServer((req, res) => {
  let { pathname } = url.parse((req.url))
  pathname === '/' && (pathname = 'index.html')
  let filePath = path.join(__dirname, 'public', pathname)

  // 强制缓存的状态码 依旧是200
  // cache-control: no-store 不存储缓存
  // cache-control: no-cache 每次都请求服务器，但是会缓存
  // 你访问我，我服务器说你可以找缓存去
  res.setHeader('cache-control', 'max-age=10') // 10s内不会再向服务器发送请求
  res.setHeader('Expires', new Date() + 10 * 1000)

  // memory cache / disk cache (浏览器会根据使用次数 、 文件类型 自动缓存）

  console.log(pathname)
  fs.stat(filePath, (err, statObj) => {
    if (err) {
      // favicon.ico 浏览器自己回去请求这个文件
      res.statusCode = 404
      res.end('Not Found')
      return
    }
    if (statObj.isFile()) {
      fs.createReadStream(filePath).pipe(res);
    }
  })
}).listen(3000)


