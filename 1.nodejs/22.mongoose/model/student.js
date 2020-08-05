const conn = require('../db')
const { SchemaTypes, Schema } = require('mongoose')
const plugin = require('../plugins/save')
let crypto = require('crypto')


const StudentSchema = Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 8,
    minLength: 6,
    trim: true
  },
  age: {
    type: Number,
    min: 5,
    max: 150
  },
  birthday: {
    type: Date,
    default: Date.now
  },
  hobby: {
    type: String,
    validate(params) {
      return params.startsWith('爱好-')
    }
  },
  password: {
    type: String,
  }
})

// // 扩展 类 的方法  （集合）
// StudentSchema.statics.findByName = function (username) {
//   return this.findOne({ username })
// }

// // 扩展 实例的 方法 （文档）
// StudentSchema.methods.savePassword = function (password) {
//   this.password = crypto.createHash('md5', 'zf').update(password).digest('base64')
// }


StudentSchema.plugin(plugin, { secret: 'zf' })

module.exports = conn.model('Student', StudentSchema, 'student')


