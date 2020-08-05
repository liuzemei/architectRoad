const crypto = require('crypto')
module.exports = function plugin(schema, options) { // options 可以传参
  schema.statics.findByName = function (username) {
    return this.find({ username })
  }
  schema.methods.savePassword = function (password) {
    this.password = crypto.createHash('md5', options.secret).update(password).digest('base64')
  }
}

// 多个表中同样的操作  可以装到实例 或者 类上   再通过插件的方式来进行引入