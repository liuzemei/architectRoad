## cookie session 和 localStorage sessionStorage 的区别
- localStorage sessionStorage（浏览器关闭后销毁） 都是存在浏览器中（）不能频繁设置 localStorage (可以用防抖或节流来优化)，上限5M
- localStorage 默认不销毁 必须手动销毁
- session 是基于 cookie 的
- http是无状态的 cookie 可以用来识别状态的 （客户端，服务端都可以设置）
- 每次请求服务器时都会发送到服务器（合理设置 cookie，cookie默认是不安全的，不能用来存放敏感信息)
- session 基于 cookie ，可以认为 session 就是一个服务器的对象（session 就是一个“内存”对象，不能持久化存储 => redis mongo）session共享比较麻烦
- 


