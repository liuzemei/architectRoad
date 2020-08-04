const { Schema, SchemaTypes } = require('mongoose')
const conn = require('../db')

const HomeworkSchema = Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  studentId: {
    ref: "Student", // 表示引用的是谁 才能使用 populate _id
    type: SchemaTypes.ObjectId
  }
})

module.exports = conn.model('Homework', HomeworkSchema, 'homework')