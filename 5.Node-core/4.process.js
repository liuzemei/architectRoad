
// console.log(Object.keys(process));
// 代表的是系统 每个系统肯定有自己的标识 来区分系统  darwin / win32 
// 系统文件的存放位置不同 /etc/xxx
// console.log(process.platform);   
// console.log(process);
// console.log(process.cpuUsage())
// console.log(process.resourceUsage())
// console.log(process.memoryUsage())

// process.kill 杀死进程
// process.exit 退出进程
// process.nextTick node 中的微任务 当前执行栈的底部 优先级比 promise 要高
// node 中 它是有自己的事件环 区分和浏览器的


// process.env 环境变量
// process.cwd()  当前的工作目录
// process.argv 执行时所带的参数

// cross-env 这个包可以跨平台设置环境变量

// console.log(process.env)  // path 设置一些局部变量 
// export key=value
// 局部变量在哪设置 在哪生效 其他运行不生效

// 根据不同的环境来做不同的事儿

// if (process.env.NODE_ENV === 'production') {
//   console.log(123)
// }


// console.log(process.argv) // 执行环境时的参数，前两个是固定的

// 用户可以解析这些参数
let obj = process.argv.slice(2).reduce((memo, current, index, arr) => {
  if (current.includes('-')) { // 下一项就是值
    memo[current.slice(1)] = arr[index + 1]
  }
  return memo
}, {})

console.log(obj)




