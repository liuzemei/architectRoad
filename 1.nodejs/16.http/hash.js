// 摘要算法

// 摘要算法 和 加密算法的区别
//  加密后能解密回来的 => 加密算法
//  加密后无法解密回来 => 摘要算法

const crypto = require('crypto')


// md5 算法  (非可逆的，摘要的内容如果相同摘要出的结果就一样, 雪崩效应，结果长度都是一致的)
// hash 算法
// sha1 sha256 hmac

let t = crypto.createHash('md5').update('hello worl').digest('base64')

console.log(t)
