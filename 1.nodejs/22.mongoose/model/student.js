const conn = require('../db')
const { SchemaTypes, Schema } = require('mongoose')
const plugin = require('../plugins/save')


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
    set(newValue) {
      return 'hello' + newValue
    }
  }
})


StudentSchema.plugin(plugin, { secret: 'zf' })

module.exports = conn.model('Student', StudentSchema, 'student')


