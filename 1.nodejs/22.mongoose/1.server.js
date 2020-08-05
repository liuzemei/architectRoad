// 连接数据库，创建 Schema， 增改查
const mongoose = require('mongoose')
const conn = mongoose.createConnection('mongodb://localhost:27017/zhufeng', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

// （骨架），结构 => 模型（集合）=> 文档

let StudentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 8,
    minLength: 6,
    trim: true,
  },
  age: {
    type: Number,
    min: 5,
    max: 150,
  },
  // gender: {
  //   enum: [0, 1]
  // },
  birthday: {
    type: Date,
    default: Date.now
  },
  hobby: {
    type: String,
    validate(params) {
      return params.startsWith('爱好-')
    }
  }
})

let Student = conn.model('Student', StudentSchema, 'student');


(async () => {
  // 一、增
  // 1. 通过集合来操作数据
  // let t = await Student.create({ username: 'test', age: 3 }) // error
  // let t = await Student.create({ username: 'test', hobby: '哈哈'}) // error
  // let t = await Student.create({ username: 'test', age: 6, hobby: '爱好-游泳' })  // ok
  // console.log(t)

  // 2. 使用文档来创建数据
  // let student = new Student({ username: 'zs' })
  // let r = await student.save()
  // console.log(r)

  // 3. 批量插入
  // let arr = []
  // for (let i = 0; i < 30; i++) {
  //   arr.push({ username: 'zs' + i })
  // }

  // let t = await Student.create(arr)
  // console.log(t)



  // 二、查
  // 1. 普通查询
  // let student = await Student.findOne({ username: 'zs' })
  // student.username = 'zhangsan'
  // let r = await student.save()
  // console.log(r)

  // 2. 分页查询
  // let currentSize = 3
  // let limit = 3
  // let r = await Student.find().skip((currentSize - 1) * limit).limit(limit)
  // console.log(r)


  // 三、改
  // let r = await Student.updateOne({ username: 'zhangsan' }, { age: 50 })
  // let student = await Student.findOne({ username: 'zhangsan' })
  // console.log(student)
  // console.log(r)












})()





