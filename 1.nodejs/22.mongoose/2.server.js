// 连表查询


let Homework = require('./model/homework')
let mongoose = require('mongoose')
let Student = require('./model/student');


(async () => {
  // 1. 生成关联数据
  // let student = await Student.create({ username: 'xuesheng1' })
  // let homework = await Homework.create({ title: '今天学mongo', content: '省略500字', studentId: student._id })
  // console.log(homework)

  // 需求： 给你一个作业你要查询出谁写的 5f294929b440a66195cbe728
  // let homework = await Homework.findById('5f294929b440a66195cbe728')
  // let student = await Student.findById(homework.studentId)
  // console.log(student)

  // 2. 聚合查询

  //  $match 匹配 $limit $sort $skip $group
  //  开发是建议使用这个 api 去进行聚合查询
  let r = await Homework.aggregate([ // 管道 过滤器 一层层的筛选
    {
      $lookup: {
        from: 'student', // 联合表名
        localField: 'studentId', // 本地key（homework的key）
        foreignField: '_id', // 外键key ()
        as: 'student', // 别名
      },
    },
    {
      $project: { // 当前显示字段
        title: 1,
        student: 1
      }
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId('5f294929b440a66195cbe728')
      }
    }
  ])

  console.log(r)
  console.log(r[0].student)
  // console.log(r[0].student[0]._id)
  // console.dir(r[0], { depth: 100 })

})()





