const express = require('./express')

const app = express()

app.get('/user/:name/:id', (req, res, next) => {
  res.end(JSON.stringify(req.params))
})

// /user/:name/:id 用户注册的
// /user/zs/110 => {name:'zs', id:110}

// let url = '/user/:name/:id'
// let keys = []
// let pathToRegExp = require('path-to-regExp')

// let reg = pathToRegExp(url, keys)

// console.log(keys.map(item => item.name))
// console.log('/user/zs/110'.match(reg).slice(1))

// 当路由存储时 需要将路径转化成正则
// 稍后请求到来时 用请求来的路径和正则做匹配，将匹配到的结果放到req属性上



// path-to-regExp
// let str = '/user/:name/:id'
// let keys = []
// let newStr = str.replace(/:([^\/]+)/g, function () {
//   keys.push(arguments[1])
//   return '([^\/]+)'
// })
// console.log(newStr)
// let t = '/user/zs/110'.match(new RegExp(newStr)).slice(1)
// console.log(t)





app.listen(3000)