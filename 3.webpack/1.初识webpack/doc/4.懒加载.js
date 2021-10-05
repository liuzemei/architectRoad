(function (modules) {

    // 缓存的模块
    let installedModules = {}
    // installedChucks
    let installedChucks = {
      main: 0
    }

    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) return installedModules[moduleId].exports

      let module = installedModules[moduleId] = {
        i: moduleId,
        l: false, // loaded=false
        exports: {}
      }
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
      module.l = true
      __webpack_require__.t = (value, mode) => {
        if (mode & 0b0001) value = __webpack_require__(value)
        if (mode & 0b1000) return value
        if (mode & 0b0100 && value.__esModule) return value
        var ns = Object.create(null)
        Object.defineProperty(ns, '__esModule', true)
        Object.defineProperty(ns, "default", value)
        // mode 0010 把 value 上的所有属性都拷贝到 ns 上
        if (mode & 0b0010) {
          for (let key in value) {
            ns[key] = value[key]
          }
        }
        return ns
      }

      __webpack_require__.e = chuckId => {
        const installedChunkData = []
        const promise = new Promise((resolve, reject) => {
          installedChunkData.push(resolve, reject)
        })
        installedChunkData.push(promise)
        installedChucks[chuckId] = installedChunkData
        let script = document.createElement("script")
        script.src = chuckId + ".js"
        document.head.appendChild(script)
        return promise
      }

      let jsonArray = []
      window["webpackJsonp"] = jsonArray
      window["webpackJsonp"].push = webpackJsonpCallBack

      // chuckIds = ["title"] moreModules = {"./src/title.js": function(module){module.exports="title"}}
      function webpackJsonpCallBack([chuckIds, moreModules]) {
        // 把异步加载过来的代码块里面的模块定义代码合并合并到 modules，以便可以在本函数中通过 __webpack_require__加载
        for (const moduleId in moreModules) {
          modules[moduleId] = moreModules[moduleId]
        }
      }

      return module.exports
    }

    return __webpack_require__("./src/index.js")
  }

)({
  "./src/index.js": function (module, exports, __webpack_require__) {
    __webpack_require__.e("title")
      .then(__webpack_require__.t.bind(null, "./src/title.js", 7))
      .then(result => console.log(result.default))
  }
})