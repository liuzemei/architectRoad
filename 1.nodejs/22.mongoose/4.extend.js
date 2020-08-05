
let Student = require('./model/student');


(async () => {
  //  给 student 文档 添加方法
  // let student = new Student()
  // student.username = 'lisi'
  // student.savePassword('1234')
  // let r = await student.save()
  // console.log(r)

  // 给 Student 实例添加静态方法
  let r = await Student.findByName('lisi')
  console.log(r)

})()