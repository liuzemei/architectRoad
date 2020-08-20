const redis = require('redis')


let client = redis.createClient(6379, '127.0.0.1')


// 1. 存取
client.set('name', JSON.stringify({ name: 'zf' }), redis.print)
client.get('name', redis.print)


// 发布订阅模式 清空缓存
// 可以多个客户端通信

let client1 = redis.createClient(6379, '127.0.0.1')
let client2 = redis.createClient(6379, '127.0.0.1')

// 订阅
// 当一个客户端订阅了之后，就不可发布了。只能由别的客户端来推送消息
client1.subscribe('zf1')
client1.on('message', (channel, message) => {
  console.log(channel, message)
})

setInterval(() => {
  client2.publish('zf1', 'hahah')
}, 1000);






