const crypto = require('crypto')
module.exports = function plugin(schema, options) {
  schema.statics.findByName = function (username) {
    return this.find({ username })
  }
  schema.methods.savePassword = function (password) {
    this.password = crypto.createHash('md5').update(password).digest('base64')
  }
}