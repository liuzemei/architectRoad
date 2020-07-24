const staticServer = require('koa-static')
const path = require('path')
exports.serveStaticPlugin = function ({ app, root }) {
  // 先以根目录作为静态目录
  app.use(staticServer(root))
  // 然后以 public 作为静态服务
  app.use(staticServer(path.join(root, 'public')))
}