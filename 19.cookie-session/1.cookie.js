const http = require('http')
const querystring = require('querystring')


http.createServer((req, res) => {
  if (req.url === '/read') {
    // 读取 cookie

    let t = querystring.parse(req.headers.cookie, ';', '=')
    res.end(JSON.stringify(t) || 'empty')
  } else if (req.url === '/write') {
    // 写入 cookie
    // Domain 针对某个域名设置 不允许非父子域（父子域可以设置） 可以限制 cookie 传输的范围  
    //  domain=.zf.cn;
    // path / 表示携带cookie的路径 带 / 的就可以设置
    //  path=/write;
    // Expires/Max-age   Expires 是一个相对时间  Max-age 是一个绝对时间  cookie过期时间
    //  max-age=10; // 秒 -> koa 里的 maxAge 是毫秒
    // HTTP-ONLY 如果服务端设置后客户端 无法通过代码获取到 cookie
    // Secure 要求是 https 才传输 cookie
    //  same-site  csrf 中使用


    res.setHeader('Set-Cookie', [`name=zf;`, `age=10`])
    res.end('write ok')
  } else {
    res.statusCode = 404
    res.end(`Not Found`)
  }
}).listen(3001)