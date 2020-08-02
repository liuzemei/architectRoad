const path = require('path')
const fs = require('fs').promises
const { createReadStream } = require('fs')
const mime = require('mime')
module.exports = dirname => {
  return async (ctx, next) => {
    let filePath = path.join(dirname, ctx.path)
    try {
      let statObj = await fs.stat(filePath)
      if (!statObj.isFile()) {
        filePath = path.join(filePath, 'index.html')
      }
      await fs.access(filePath)
      ctx.type = mime.getType(filePath) + ';charset=utf-8'
      ctx.body = createReadStream(filePath)
    } catch (e) {
      await next()
    }
  }
}