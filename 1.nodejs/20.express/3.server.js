// 中间件的实现
const express = require('./express')
const app = express()

//  在 koa 中 路由（路径匹配到才执行） 中间件（一定会执行）
// 在 express 里（路由的特点是 路径方法一样就执行）  中间件（路径满足就会执行 和 cookie 中的路径是一样的）

// 1. 扩展属性和方法
// 2. 可以决定是否向下执行
// 3. 控制权限，针对某个路由进行拦截 （一般放在要拦截的路由的前面）

app.use('/', (req, res, next) => {
  console.log(1)
  next()
}, (req, res, next) => {
  console.log(2)
  next()

}, (req, res, next) => {
  console.log(3)
  next()

})

app.use((req, res, next) => {

  console.log(4)
  next()
})

app.use('/user', (req, res, next) => {

  console.log(5)
  next()
})

app.get('/user/add', (req, res) => {
  console.log('user get')
})

app.get('/useradd', (req, res) => {
  console.log('userget')
})

app.listen(3000)
