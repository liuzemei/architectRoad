const http = require('http')
const querystring = require('querystring')

// 加盐算法 （和 md5 一样不可逆，但是多一个秘钥）

const secret = 'liuzemei'


const crypto = require('crypto')

const sign = val => {
  return crypto.createHmac('sha256', secret).update(val).digest('base64').replace(/\+\/\=/g, '')
}

http.createServer((req, res) => {

  req.getCookie = function (key, opts) {
    let cookieObj = querystring.parse(req.headers.cookie, '; ', '=')

    let result = cookieObj[key]
    if (opts.signed) {
      let val = result
      console.log(val)
      let [value, oldSign] = val.split('.')
      if (sign(value) !== oldSign) return ''
      result = value
    }

    return result
  }

  const cookieArr = [];

  res.setCookie = function (key, value, opts = {}) {
    let optArgs = [];

    Object.keys(opts).forEach(key => {
      optArgs.push(`${key}=${opts[key]}`)
    })

    if (opts.signed) {
      value = `${value}.${sign(value)}`
    }
    cookieArr.push(`${key}=${value};${optArgs.join(';')}`)
    res.setHeader('Set-Cookie', cookieArr)
  }

  if (req.url === '/read') {

    res.end(req.getCookie('name', { signed: true }) || 'empty')
  } else if (req.url === '/write') {
    // 希望用户如果改变了  cookie  我就不识别他了
    res.setCookie('name', 'zf', { httpOnly: true, maxAge: 100, signed: true })
    res.setCookie('age', '10')
    res.end('ok')
  } else {
    res.statusCode = 404
    res.end(`Not Found`)
  }
}).listen(3001)