// async + await 就是 co + generator 的语法糖
// 把 * 变成了 async 然后把 yield 变成了 await


const fs = require('fs').promises

async function read() {
  try {
    let content = await fs.readFile('./name.txt', 'utf-8')
    let age = await fs.readFile(content, 'utf-8')
    return age
  } catch (e) {
    console.log(e, '********')
  }
}

read().then(console.log)
// (1) 如何实现一个 async + await

// generator-runtime

