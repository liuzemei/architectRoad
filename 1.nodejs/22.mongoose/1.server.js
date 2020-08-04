const mongoose = require('mongoose')
const conn = mongoose.createConnection('mongodb://localhost:27017/zhufeng')

// （骨架），结构 => 模型（集合）=> 文档

let StudentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  gender: {

  },
  birthday: {
    type: Date,
    default: Date.now
  }
})




