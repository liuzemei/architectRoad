//  populate 已经不建议使用了，因为需要 定义 ref ，不过用起来是真的方便...
let Homework = require('./model/homework')
let mongoose = require('mongoose')
let Student = require('./model/student');


(async () => {
  let r = await Homework.find().populate('studentId', { birthday: 0 })
  console.log(r)
})()


