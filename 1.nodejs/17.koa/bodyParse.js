const queryString = require('querystring')

module.exports = function () {
  return async (ctx, next) => {
    let body = await new Promise(resolve => {
      let arr = []
      ctx.req.on('data', (chunk) => arr.push(chunk))
      ctx.req.on('end', () => {
        resolve(Buffer.concat(arr).toString())
      })
    })

    ctx.request.body = queryString.parse(body, '&')
    await next()
  }
}