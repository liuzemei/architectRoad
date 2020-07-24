const http = require('http')
const fs = require('fs').promises
const path = require('path')
const url = require('url')

const { createReadStream } = require('fs')


const mime = require('mime')
const ejs = require('ejs')
const chalk = require('chalk')

const crypto = require('crypto')
const zlib = require('zlib')


class Server {
  constructor({ port, directory, address }) {
    this.port = port
    this.directory = directory
    this.address = address
  }

  async handleRequest(req, res) {
    // 你请求我，我需要获得你请求的路径 通过路径返回你对应的内容
    // 静态服务

    let { pathname } = url.parse(req.url)
    pathname = decodeURIComponent(pathname)
    let filePath = path.join(this.directory, pathname)

    // 用户请求的是文件 也有可能请求的是个目录
    try {
      let statObj = await fs.stat(filePath)
      if (statObj.isFile()) {
        //   文件， 读取文件 返回对应的文件
        // 把读流 直接 写到 写流 中
        this.handleFile(filePath, req, res, statObj)
      } else {
        //   文件夹， 将文件夹的目录列出来 返还回去
        //   文件夹，需要将目录下的内容全部读取出来 返回回去

      }
    } catch (e) {
      this.handleError(e, req, res)
    }
  }

  async cache(filePath, req, res, statObj) {
    res.setHeader('Expires', (new Date(Date.now() + 10 * 1000)).toGMTString())
    res.setHeader('Cache-Control', 'max-age=10')

    let lastModified = statObj.ctime.toGMTString()
    let content = await fs.readFile(filePath)
    let etag = crypto.createHash('md5').update(content).digest('base64')
    res.setHeader('Last-Modified', lastModified)
    res.setHeader('Etag', etag)

    new Date().toISOString()

    //   获取浏览器的 header
    let ifModifiedSince = req.headers['if-modified-since']
    let ifNoneMatch = req.headers['if-none-match']
    return ifModifiedSince === lastModified && ifNoneMatch === etag
  }

  gzip(filePath, req, res, statObj) {
    //  content-encoding
    let encoding = req.headers['accept-encoding']
    if (encoding && encoding.includes('gzip')) {
      res.setHeader('Content-Encoding', 'gzip') // 浏览器看到这个标识会自动解压缩
      return zlib.createGzip()
    } else return false
  }

  async handleFile(filePath, req, res, statObj) {
    let cache = await this.cache(filePath, req, res, statObj)
    if (cache) {
      res.statusCode = 304
      return res.end()
    }
    res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
    // res.setHeader('Content-Type', mime.getType(filePath))
    // res.setHeader('Content-Encoding', 'charset=utf-8')
    // 若果没有缓存就返回文件（压缩）
    let gzip = this.gzip(filePath, req, res, statObj)
    if (gzip) { // 支持 gzip 压缩
      createReadStream(filePath).pipe(gzip).pipe(res)
    } else { // 不支持
      createReadStream(filePath).pipe(res)
    }
  }


  handleError(err, req, res) {
    console.log(err)
    res.statusCode = 404
    res.end('Not Found')
  }

  start() {
    // http.createServer 默认这个返回中的回调的 this 指向的是 createServer 的返回值
    let server = http.createServer(this.handleRequest.bind(this))

    server.listen(this.port, this.address, () => {
      console.log(chalk.yellow('Starting up zf-host-server, serving ./'))
      console.log(`   http://${this.address}:${chalk.green(this.port)}`)
    })


  }
}

module.exports = Server