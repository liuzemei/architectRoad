const Server = require('./application')

module.exports = function (config) {
  let { port, directory, address } = config
  //  创建 http 服务
  // 异步功能 async + await 所有的方法更好管理一些
  let server = new Server({
    port, directory, address
  }); // 工厂模式

  return server
}