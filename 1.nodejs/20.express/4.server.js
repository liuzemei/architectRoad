// 错误处理中间件


const express = require('./express')
const app = express()


// app.use((req, res, next) => {
//   next('use error')
// })



app.get('/', (req, res, next) => {
  next('error1')
})



// 此中间件需要放到页面的最底部

// 一旦出错会跳过所有的错误处理中间件
app.use((err, req, res, next) => { // 参数是4个
  res.end(err + 'ok')
})

app.listen(3000)

