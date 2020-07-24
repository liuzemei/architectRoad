const fs = require('fs')

const ejs = require('ejs');
(async () => {
  let str = await renderFile('./template.html', { name: 'liuzemei', age: 10, arr: [1, 2, 3, 4, 5] }, (err, html) => {
    console.log(html)
  })
  console.log(str)
})()


function renderFile(filePath, data, cb) {
  let content = fs.readFileSync(filePath, 'utf8')

  let head = "let str = `";
  content.replace(/<%=(.+?)%>/g, function () {
    console.log(arguments[1])

  })
}