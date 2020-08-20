import install from "./install"
import createMatcher from "./create-match"



class VueRouter {
  constructor(options) {
    console.log(options)
    //  根据用户的

    createMatcher(options)
  }

  init(app) {
    console.log(app)
  }
}

VueRouter.install = install


// 默认 vue-router 插件导出一个类，用户会new Router({})




export default VueRouter