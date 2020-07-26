const express = require('./express')

const app = express()

//  路径和处理函数是一个一对多的关系


app.get('/', (req, res, next) => {
  console.log(1)
  res.end('test')
  next()
  console.log('1 end')
}, (req, res, next) => {
  console.log(11)
  next()
})

app.get('/', (req, res, next) => {
  console.log(2)
  next()
  console.log('2 end')
})

app.get('/', (req, res, next) => {
  console.log('ok')
  res.end('ok')
  next()
  console.log('ok end')
})

// app.route('/home')
//   .get((req, res) => {
//     res.end('query')
//   })
//   .post((req, res) => {
//     res.end('add')
//   })

app.post('/', (req, res) => {
  res.end('post')
})



app.listen(3000)
