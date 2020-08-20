const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})
app.get('/get', (req, res) => {
  res.json(req.query)
})
app.post('/post', (req, res) => {
  res.json(req.body)
})
app.post('/post_timeout', (req, res) => {
  console.log(req.query)
  let { timeout } = req.query
  if (timeout) {
    timeout = parseInt(timeout)
  } else {
    timeout = 0
  }
  setTimeout(() => {
    res.json(req.body)
  }, timeout);
})
app.post('/post_status', (req, res) => {
  let { code } = req.query
  if (code) {
    code = parseInt(code)
  } else {
    code = 200
  }
  res.statusCode = code
  res.json(req.body)
})
app.listen(8080)