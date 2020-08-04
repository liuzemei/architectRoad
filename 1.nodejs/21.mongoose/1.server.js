const mongoose = require('mongoose')

const conn = mongoose.createConnection('mongodb://zhu:zhu@localhost:27017/zhufeng', {
  poolSize: 4,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 创建一个学生集合 学生名 入学时间 性别 年龄 ...
// 存储的结构
let StudentSchema = mongoose.Schema({
  name: { // 姓名
    type: String,
    required: true
  },
  createAt: { // 入学时间
    type: Date,
    default: Date.now
  },
  gender: {
    type: Number,
    // default: 1
    ofNumber: [0, 1]
  },
  // gender: [0, 1],
  age: {
    type: Number,
    required: true
  }
}, { collection: 'Student' })// 限制集合的名字就是 Student 否则会被转换成 students

// 创建模型（拿到集合） 通过模型来操作数据
let Student = conn.model('Student', StudentSchema);
(async () => {
  // 增
  // let student = await Student.create({ name: 'zs', gender: 2, age: 20, a: 1 })

  // 查询
  // let t = await Student.find() // 查所有
  // let t = await Student.findOne({ name: 'zs' }) // 查一个
  let t = await Student.find({}, { createAt: 1 }) // 只查询 createAt 字段

  // 改
  // 默认修改不会覆盖掉原有的 （原生的mongodb会覆盖掉）
  // let student = await Student.updateOne({ name: /zf/ }, { age: 200 }) //改一条
  // let student = await Student.updateMany({ name: /zf/ }, { age: 200 }) //改多条

  // 删
  // let student = await Student.deleteOne({ name: /zf/ }, { age: 200 }) //删一条
  // let student = await Student.deleteMany({ name: /zf/ }, { age: 200 }) //删多条



  // mongoose 其他用法 实现扩展 连表查询 方法的扩展 聚合查询
  



  console.log(t)
})()



// 连接
conn.on('connected', () => {
  console.log('连接成功了')
})







