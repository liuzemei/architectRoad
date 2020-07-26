const layers = []

module.exports = class Router {

  get(path, handler) {
    layers.push({
      path,
      method: 'GET',
      handler
    })
  }

  routes() {
    return async (ctx, next) => {
      let matchRoutes = layers.filter(layer => ctx.method === layer.method && ctx.path === layer.path)
      console.log(matchRoutes)

      // 方法是一个一个对象，里面包的是 promise 希望一个一个按顺序执行




    }
  }
}